"use client"

import { CompatClient } from "@stomp/stompjs"
import { useLayoutEffect, useRef } from "react"
import {
  ConnectSuccessDetail,
  connectSuccessEventname,
} from "./SocketConnection"
import { Button } from "@/components/ui/button"
import { SessionPayload } from "@/recoil/atoms/user"
import Inner from "@/components/shared/Inner"
import { NavigationIcons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"
import CodeEditor, {
  InsertCodePayload,
  insertCodeEventName,
} from "./code/CodeEditor"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import LoginForm from "@/components/form/LoginForm"
import { useRouter, useSearchParams } from "next/navigation"
import { PopupMessage } from "@/page/coffee-chat/chat/ChatRoomHeader"
import { getAuthCookie } from "@/util/actions/cookie"
import { toast } from "react-toastify"
import { useClientSession } from "@/hooks/useClientSession"

dayjs.extend(utc)

interface MessageControlProps {
  roomKey: string
  user: NonNullable<SessionPayload>
}

function MessageControl({ roomKey, user }: MessageControlProps) {
  const { replace } = useRouter()

  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  const { clientSessionReset } = useClientSession()

  const { openModal } = useModal()

  const stompRef = useRef<CompatClient | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!textAreaRef?.current) return

    /*
      [TODO]
      - 백엔드와 협의 필요 
      (논의 결과에 따라 로직 변경될 수 있음 /
      현재는 보내기시 토큰이 없을 경우, 
      로그인 모달 나오고 브라우저 세션도 초기화 하여 동기화 함)
        - 채팅 참여 도중 토큰이 만료되어 사라졌을 때 나가기 전까지는
          계속 참여할 수 있도록 유지 시킬 것인가?
        - 메시지 header에 accessToken도 같이 보내서 권한을 체크하도록 해야 되는가?
      
      - 메시지에 멤버리스트가 포함되있는 것으로 반영되면,
        해당 멤버리스트를 활용하여 isRoomMember 적용
    */
    const { accessToken } = await getAuthCookie()

    if (!accessToken) {
      openModal({
        containsHeader: false,
        closeableDim: false,
        content: (
          <LoginForm
            onSuccess={(loginUser) => {
              if (isPopup) {
                ;(window.opener.postMessage as typeof window.postMessage)(
                  {
                    type: "reLogin",
                    user: loginUser,
                    isRoomMember: user.nickname === loginUser.nickname,
                  } as PopupMessage,
                  process.env.NEXT_PUBLIC_SITE_URL!,
                )

                if (user.nickname !== loginUser.nickname) {
                  window.close()
                }

                return
              }

              if (user.nickname !== loginUser.nickname) {
                replace("/chat?page=0")

                setTimeout(() => {
                  toast.error("입장 가능한 유저가 아닙니다", {
                    position: "bottom-center",
                  })
                }, 0)
              }
            }}
          />
        ),
      })

      if (isPopup) {
        ;(window.opener.postMessage as typeof window.postMessage)(
          { type: "loginRequired" } as PopupMessage,
          process.env.NEXT_PUBLIC_SITE_URL!,
        )

        return
      }

      clientSessionReset()

      return
    }

    const message = textAreaRef.current.value
    if (!message) return

    stompRef.current?.send(
      `/app/chat/message`,
      {},
      JSON.stringify({
        type: "TALK",
        room_key: roomKey,
        sender: user.nickname,
        message,
        sender_id: user.member_id,
        sender_image_url: user.image_url,
        send_time: dayjs().utc().format(),
      }),
    )

    textAreaRef.current.value = ""
  }

  useLayoutEffect(() => {
    const handleConnectSuccess = (e: CustomEvent) => {
      const { stomp } = e.detail as ConnectSuccessDetail

      stompRef.current = stomp
    }

    const insertCode = (e: CustomEvent) => {
      const { message } = e.detail as InsertCodePayload

      stompRef.current?.send(
        `/app/chat/message`,
        {},
        JSON.stringify({
          type: "CODE",
          room_key: roomKey,
          sender: user.nickname,
          message,
          sender_id: user.member_id,
          sender_image_url: user.image_url,
          send_time: dayjs().utc().format(),
        }),
      )
    }

    window.addEventListener(
      connectSuccessEventname as any,
      handleConnectSuccess,
    )

    window.addEventListener(insertCodeEventName as any, insertCode)

    return () => {
      window.removeEventListener(
        connectSuccessEventname as any,
        handleConnectSuccess,
      )

      window.removeEventListener(insertCodeEventName as any, insertCode)
    }
  }, []) /* eslint-disable-line */

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={`w-full fixed bottom-0 bg-white ${
        isPopup
          ? "z-[2] left-0"
          : "z-[8] left-0 sm:left-[200px] sm:w-[calc(100%-200px)]"
      }`}
    >
      <Inner className="flex flex-col gap-1 px-2 py-1 box-border border border-colorsGray bg-white">
        <Toolbar />
        <div className="flex w-full justify-between">
          <textarea
            ref={textAreaRef}
            spellCheck="false"
            rows={1}
            className="flex-1 box-border px-2 py-1 resize-none outline-none"
            onKeyDown={(e) => {
              // soft break
              if (e.shiftKey && e.key === "Enter") {
                e.preventDefault()

                if (e.nativeEvent.isComposing) return

                e.currentTarget.value += "\n"

                e.currentTarget.scroll({
                  top: e.currentTarget.scrollHeight,
                })

                return
              }

              // submit
              if (e.key === "Enter") {
                e.preventDefault()

                if (e.nativeEvent.isComposing) return

                submitBtnRef.current?.click()
              }
            }}
          />
          <Button
            type="button"
            ref={submitBtnRef}
            className="shrink-0"
            onClick={() => formRef.current?.requestSubmit()}
          >
            보내기
          </Button>
        </div>
      </Inner>
    </form>
  )
}

export default MessageControl

function Toolbar() {
  const { openModal } = useModal()

  const openCodeEditor = () => {
    openModal({
      containsHeader: false,
      closeableDim: true,
      content: <CodeEditor />,
    })
  }

  return (
    <div className="w-full h-[32px] box-border p-1 flex items-center">
      <button
        className="inline-flex align-top justify-center items-center gap-1 hover:bg-colorsLightGray px-1 py-0.5"
        onClick={openCodeEditor}
      >
        <NavigationIcons.QnA className="text-base" />
        <span className="text-xs">코드 입력</span>
      </button>
    </div>
  )
}

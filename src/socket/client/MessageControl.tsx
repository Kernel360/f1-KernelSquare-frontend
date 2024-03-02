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

dayjs.extend(utc)

interface MessageControlProps {
  roomKey: string
  user: NonNullable<SessionPayload>
}

function MessageControl({ roomKey, user }: MessageControlProps) {
  const stompRef = useRef<CompatClient | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!textAreaRef?.current) return

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
      className="w-full fixed left-0 bottom-0 z-[2] bg-white"
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

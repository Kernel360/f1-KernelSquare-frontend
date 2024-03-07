"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { popupWindowAtom } from "@/recoil/atoms/popup/popupWindowAtom"
import { cloneDeep } from "lodash-es"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { getKorDayjs } from "@/util/getDate"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useLayoutEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AxiosError } from "axios"
import { EnterChatRoomRequest } from "@/interfaces/dto/coffee-chat/enter-chat-room"
import { APIResponse } from "@/interfaces/dto/api-response"
import { enterChatRoom } from "@/service/coffee-chat"
dayjs.extend(isBetween)

interface EnterCoffeeChatProps {
  articleTitle: string
  roomId: number | null
  startTime: string | null
  reservation_id: number
}

function EnterCoffeeChat({
  articleTitle,
  roomId,
  startTime,
  reservation_id,
}: EnterCoffeeChatProps) {
  const { user } = useClientSession()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [popupWindow, setPopupWindow] = useRecoilState(popupWindowAtom)

  const openChatRoomPopup = () => {
    if (roomId === null) return

    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set("popup", "true")
    urlSearchParams.set("title", articleTitle)

    const popup = window.open(
      `/chat/room/${reservation_id}?${urlSearchParams.toString()}`,
      "kernel_chat_window",
      "width=500, height=600",
    )

    setPopupWindow(popup)

    localStorage.setItem(
      "popup",
      JSON.stringify(cloneDeep({ postMessage: popup?.postMessage })),
    )
  }

  const onSubmitEnterCoffeeChatRoom = async () => {
    if (typeof window === "undefined") return

    const toastId = "openPopupError"

    if (!user) {
      toast.error("로그인 후 다시 시도해주세요", {
        position: "bottom-center",
        toastId,
      })

      revalidatePage("/chat/[id]", "page")

      return
    }

    if (!!popupWindow) {
      toast.error("현재 커피챗 팝업이 활성화 되있습니다", {
        position: "bottom-center",
        toastId,
      })

      return
    }

    if (!isValidTime({ startTime })) {
      toast.error("입장 가능한 시간이 아닙니다", {
        position: "bottom-center",
        toastId,
      })

      return
    }

    openChatRoomPopup()
  }

  useLayoutEffect(() => {
    /*
      button 컴포넌트 props 로 disable 설정시
      server: null
      client: (boolean)
      으로 인한 하이드레이션 오류가 발생하여
      클릭해도 버튼 동작하지 않음
      -> useLayoutEffect를 통해 클라이언트 사이드에서
      disable을 직접 설정하는 방식으로 수정
    */
    if (!buttonRef?.current) return
    ;(async () => {
      const disabled = await getDisabled({
        roomId,
        validTime: isValidTime({ startTime }),
        hasPopup: !!popupWindow,
        article_title: articleTitle,
        reservation_id,
      })

      if (buttonRef.current) {
        buttonRef.current.disabled = disabled

        if (!disabled) {
          buttonRef.current.classList.remove(
            "bg-colorsGray",
            "text-colorsDarkGray",
          )
          buttonRef.current.style.cssText = `
            background-color: var(--colors-primary);
            color: #fff;
          `
        }

        if (disabled) {
          buttonRef.current.style.removeProperty("background-color")
          buttonRef.current.style.removeProperty("color")
        }
      }
    })()
  }, [roomId, startTime, popupWindow, articleTitle, reservation_id])

  return (
    <Button
      ref={buttonRef}
      onClick={onSubmitEnterCoffeeChatRoom}
      className={`bg-colorsGray text-colorsDarkGray disabled:bg-colorsGray disabled:text-colorsDarkGray`}
    >
      {popupWindow ? `커피챗 팝업 이용 중` : `커피챗 입장하기`}
    </Button>
  )
}

export default EnterCoffeeChat

function isValidTime({ startTime }: { startTime: string | null }) {
  if (!startTime) return false

  const now = getKorDayjs(dayjs())

  const startKorTime = getKorDayjs(startTime)
  const endKorTime = startKorTime.clone().add(30, "minutes")

  const isBetween = now.isBetween(startKorTime, endKorTime, "minutes", "[)")

  return isBetween
}

async function getDisabled({
  roomId,
  validTime,
  hasPopup,
  reservation_id,
  article_title,
}: {
  roomId: number | null
  validTime: boolean
  hasPopup: boolean
} & EnterChatRoomRequest) {
  try {
    const res = await enterChatRoom({
      reservation_id,
      article_title,
    })

    const activeState = res.data.data?.active

    if (activeState !== null && !activeState) {
      return true
    }

    return roomId === null || !validTime || hasPopup
  } catch (error) {
    const activeState = roomId === null || !validTime || hasPopup

    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      console.log({
        activeStateError: response?.data,
      })

      return activeState
    }

    console.log({ activeStateError: error })

    return activeState
  }
}

"use client"

import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { popupWindowAtom } from "@/recoil/atoms/popup/popupWindowAtom"
import { cloneDeep } from "lodash-es"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { twMerge } from "tailwind-merge"
dayjs.extend(isBetween)

export type EnterCoffeeChatProps = {
  articleTitle: string
  roomId: number | null
  startTime: string | null
  reservation_id: number
  className?: string
}

function EnterCoffeeChatButton({
  articleTitle,
  roomId,
  startTime,
  reservation_id,
  className,
}: EnterCoffeeChatProps) {
  const { user } = useClientSession()

  const [popupWindow, setPopupWindow] = useRecoilState(popupWindowAtom)

  // const isTimePossible = dayjs().isBetween(
  //   dayjs(startTime),
  //   dayjs(startTime).add(30, "minutes"),
  //   "seconds",
  //   "[]",
  // )

  const openChatRoomPopup = () => {
    // if (!isTimePossible) return
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
    if (!user) {
      toast.error("로그인 후 다시 시도해주세요", { position: "bottom-center" })

      return
    }

    if (!!popupWindow) {
      toast.error("현재 커피챗 팝업이 활성화 되있습니다", {
        position: "bottom-center",
      })
    }

    openChatRoomPopup()
  }

  const ButtonClass = twMerge(
    ["disabled:bg-colorsGray disabled:text-colorsDarkGray"],
    className,
  )

  return (
    <Button
      buttonTheme="primary"
      disabled={roomId === null || !!popupWindow}
      onClick={onSubmitEnterCoffeeChatRoom}
      className={ButtonClass}
    >
      {popupWindow ? `커피챗 팝업 이용 중` : `커피챗 입장하기`}
    </Button>
  )
}

export default EnterCoffeeChatButton

"use client"

import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { popupWindowAtom } from "@/recoil/atoms/popup/popupWindowAtom"
import { cloneDeep, cloneDeepWith } from "lodash-es"

interface EnterCoffeeChatProps {
  articleTitle: string
  roomId: number | null
}

function EnterCoffeeChat({ articleTitle, roomId }: EnterCoffeeChatProps) {
  const { user } = useClientSession()

  const [popupWindow, setPopupWindow] = useRecoilState(popupWindowAtom)

  const openChatRoomPopup = () => {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set("popup", "true")
    urlSearchParams.set("title", articleTitle)

    const popup = window.open(
      `/chat/room/${roomId}?${urlSearchParams.toString()}`,
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

  return (
    <Button
      buttonTheme="primary"
      disabled={!!popupWindow}
      onClick={onSubmitEnterCoffeeChatRoom}
      className="disabled:bg-colorsGray disabled:text-colorsDarkGray"
    >
      {popupWindow ? `커피챗 팝업 이용 중` : `커피챗 입장하기`}
    </Button>
  )
}

export default EnterCoffeeChat

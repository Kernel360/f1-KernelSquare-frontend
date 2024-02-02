"use client"

import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { PopupMessage } from "../chat/ChatRoomHeader"

interface EnterCoffeeChatProps {
  articleTitle: string
  roomId: number
}

function EnterCoffeeChat({ articleTitle, roomId }: EnterCoffeeChatProps) {
  const { user, clientSessionReset } = useClientSession()

  const openChatRoomPopup = () => {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.set("popup", "true")
    urlSearchParams.set("title", articleTitle)

    const popup = window.open(
      `/chat/room/${roomId}?${urlSearchParams.toString()}`,
      "kernel_chat_window",
      "width=400, height=500",
    )
  }

  const onSubmitEnterCoffeeChatRoom = async () => {
    if (!user) {
      toast.error("로그인 후 다시 시도해주세요", { position: "bottom-center" })

      return
    }

    openChatRoomPopup()
  }

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if ((e.source as Window).name !== "kernel_chat_window") return
      if (e.origin !== window.location.origin) return

      const { type, user } = e.data as PopupMessage

      if (type === "loginRequired") {
        clientSessionReset()

        return
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, []) /* eslint-disable-line */

  return (
    <Button buttonTheme="primary" onClick={onSubmitEnterCoffeeChatRoom}>
      커피챗 입장
    </Button>
  )
}

export default EnterCoffeeChat

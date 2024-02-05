"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { PopupMessage } from "@/page/coffee-chat/chat/ChatRoomHeader"
import { popupWindowAtom } from "@/recoil/atoms/popup/popupWindowAtom"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

function PopupEventListener() {
  const { clientSessionReset } = useClientSession()

  const params = useParams()

  const [popupWindow, setPopupWindow] = useRecoilState(popupWindowAtom)

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if ((e.source as Window).name !== "kernel_chat_window") return
      if (e.origin !== process.env.NEXT_PUBLIC_SITE_URL!) return

      const { type, user } = e.data as PopupMessage

      if (type === "loginRequired") {
        clientSessionReset()

        return
      }

      if (type === "leave") {
        setPopupWindow(null)
        if (typeof window !== "undefined") {
          localStorage.removeItem("popup")
        }
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  })

  return null
}

export default PopupEventListener

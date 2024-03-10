"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { PopupMessage } from "@/page/coffee-chat/chat/ChatRoomHeader"
import { userAtom } from "@/recoil/atoms/user"
import { addPopupStorageItem, removePopupStorageItem } from "@/util/chat/popup"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useSetRecoilState } from "recoil"

function PopupEventListener() {
  const { clientSessionReset } = useClientSession()

  const setUserAtom = useSetRecoilState(userAtom)

  useEffect(() => {
    /*
      팝업에서 보낸 메시지를 수신
    */
    const handleMessage = (e: MessageEvent) => {
      if ((e.source as Window).name !== "kernel_chat_window") return
      if (e.origin !== process.env.NEXT_PUBLIC_SITE_URL!) return

      const { type, user, isRoomMember, reservationId } = e.data as PopupMessage

      switch (type) {
        // 팝업창이 열린 상태
        case "popupOpen":
        // 입장 완료
        case "enter":
          addPopupStorageItem({ reservationId })

          break
        // 팝업창이 닫힌 상태
        case "popupClose":
        // 방 나가기
        case "leave":
          removePopupStorageItem({ reservationId })

          break
        // 만료되어 닫힘
        case "finished":
          removePopupStorageItem({ reservationId })

          break
        // 로그인 만료
        case "loginRequired":
          clientSessionReset()

          break
        // 토큰 만료이후 재로그인
        case "reLogin":
          setUserAtom({ ...user })

          setTimeout(() => {
            if (isRoomMember !== undefined && !isRoomMember) {
              toast.error("입장 가능한 유저가 아닙니다", {
                position: "bottom-center",
              })
            }
          }, 0)

          break
        default:
          break
      }

      window.dispatchEvent(new StorageEvent("storage"))
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, []) /* eslint-disable-line */

  return null
}

export default PopupEventListener

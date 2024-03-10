"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { PopupMessage } from "@/page/coffee-chat/chat/ChatRoomHeader"
import {
  addPopupStorageItem,
  hasPopup,
  removePopupStorageItem,
} from "@/util/chat/popup"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

type ErrorType =
  | "LoginRequired"
  | "Unactived"
  | "NotMatch"
  | "NotFound"
  | "Unauthorization"
  | "InternalServer"

interface ChatErrorProps {
  errorType: ErrorType
  errorMessage?: string
}

function ChatError({ errorType, errorMessage }: ChatErrorProps) {
  const params = useParams()
  const reservationId = Number(params.id)

  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  const ChatErrorComponent = () => {
    switch (errorType) {
      case "LoginRequired":
        return <ChatError.LoginRequired />
      case "Unactived":
        return <ChatError.Unactived />
      case "NotMatch":
        return <ChatError.NotMatch />
      case "NotFound":
        return <ChatError.NotFound />
      case "Unauthorization":
        return <ChatError.Unauthorization />
      default:
        return <ChatError errorType="InternalServer" />
    }
  }

  useEffect(() => {
    if (!hasPopup({ reservationId })) {
      addPopupStorageItem({ reservationId })

      window.dispatchEvent(new StorageEvent("storage"))
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isPopup) {
        ;(window.opener.postMessage as typeof window.postMessage)(
          { type: "popupClose", reservationId } as PopupMessage,
          process.env.NEXT_PUBLIC_SITE_URL!,
        )

        return
      }

      removePopupStorageItem({ reservationId })
      window.dispatchEvent(new StorageEvent("storage"))
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) /* eslint-disable-line */

  return (
    <div className="flex flex-col w-fit h-[100dvh] justify-center items-center mx-auto">
      <ChatErrorComponent />
      <section>
        <h4 className="w-full bg-slate-500 text-white">에러메시지</h4>
        <span>{errorMessage ?? "unknown"}</span>
      </section>
    </div>
  )
}

export default ChatError

ChatError.LoginRequired = function ChatLoginRequired() {
  const { clientSessionReset } = useClientSession()

  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  useEffect(() => {
    if (isPopup) {
      ;(window.opener.postMessage as typeof window.postMessage)(
        { type: "loginRequired" } as PopupMessage,
        process.env.NEXT_PUBLIC_SITE_URL!,
      )

      return
    }

    clientSessionReset()
  }, []) /* eslint-disable-line */

  return <div>로그인이 필요한 서비스입니다</div>
}

ChatError.Unactived = function ChatUnactived() {
  return <div>입장 가능한 상태가 아닙니다</div>
}

ChatError.NotMatch = function ChatNotMatch() {
  return <div>유효한 타입이 아닙니다</div>
}

ChatError.NotFound = function ChatNotFound() {
  return <div>존재하지 않는 채팅 방입니다</div>
}

ChatError.Unauthorization = function ChatUnauthorization() {
  return <div>입장 가능한 멤버가 아닙니다</div>
}

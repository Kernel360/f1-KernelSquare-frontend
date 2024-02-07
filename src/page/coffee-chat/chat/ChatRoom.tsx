"use client"

import Messages from "@/socket/client/Messages"
import SocketConnection from "@/socket/client/SocketConnection"
import ChatRoomHeader, { PopupMessage } from "./ChatRoomHeader"
import MessageControl from "@/socket/client/MessageControl"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { getKorDayjs } from "@/util/getDate"
import { useSearchParams } from "next/navigation"
import Button from "@/components/shared/button/Button"
import { useEffect } from "react"
import type { SessionPayload } from "@/recoil/atoms/user"

interface ChatRoomProps {
  serverUrl: string
  articleTitle: string
  roomId: number
  roomKey: string
  user: NonNullable<SessionPayload>
  expiration_time: string
}

function ChatRoom({
  serverUrl,
  articleTitle,
  roomKey,
  user,
  expiration_time,
}: ChatRoomProps) {
  return (
    <>
      <ErrorBoundary FallbackComponent={ChatRoomFallback}>
        <ChatRoomHeader
          startDate={getKorDayjs(expiration_time).format("YYYY-MM-DDTHH:mm:ss")}
          articleTitle={articleTitle}
          user={user}
        />
        <SocketConnection serverUrl={serverUrl} roomKey={roomKey} user={user} />
        <Messages roomKey={roomKey} user={user} />
        <MessageControl roomKey={roomKey} user={user} />
      </ErrorBoundary>
    </>
  )
}

export default ChatRoom

function ChatRoomFallback({ error }: FallbackProps) {
  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      ;(window.opener.postMessage as typeof window.postMessage)(
        { type: "leave" } as PopupMessage,
        process.env.NEXT_PUBLIC_SITE_URL!,
      )
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  if (error.message === "cannotConnect") {
    return (
      <div className="flex flex-col w-full justify-center items-center gap-2">
        채팅 서버에 접속할 수 없습니다
        {isPopup ? (
          <Button
            buttonTheme="secondary"
            onClick={() => {
              window.close()
            }}
          >
            나가기
          </Button>
        ) : null}
      </div>
    )
  }

  return <div className="flex w-full justify-center items-center">에러</div>
}

"use client"

import Messages from "@/socket/client/Messages"
import SocketConnection from "@/socket/client/SocketConnection"
import ChatRoomHeader from "./ChatRoomHeader"
import MessageControl from "@/socket/client/MessageControl"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import Inner from "@/components/shared/Inner"
import { getKorDayjs } from "@/util/getDate"
import type { SessionPayload } from "@/recoil/atoms/user"

interface ChatRoomProps {
  serverUrl: string
  articleTitle: string
  roomKey: string
  user: NonNullable<SessionPayload>
  expiration_time: string
  reservation_id: number
}

function ChatRoom({
  serverUrl,
  articleTitle,
  roomKey,
  reservation_id,
  user,
  expiration_time,
}: ChatRoomProps) {
  return (
    <Inner>
      <ChatRoomHeader
        startDate={getKorDayjs(expiration_time).format("YYYY-MM-DDTHH:mm:ss")}
        articleTitle={articleTitle}
        roomKey={roomKey}
        reservationId={reservation_id}
        user={user}
      />
      <ErrorBoundary FallbackComponent={ChatRoomFallback}>
        <SocketConnection
          serverUrl={serverUrl}
          roomKey={roomKey}
          reservationId={reservation_id}
          user={user}
        />
        <Messages roomKey={roomKey} user={user} />
        <MessageControl roomKey={roomKey} user={user} />
      </ErrorBoundary>
    </Inner>
  )
}

export default ChatRoom

function ChatRoomFallback({ error }: FallbackProps) {
  return (
    <div className="flex w-full justify-center items-center">
      채팅 서버에 접속할 수 없습니다.
    </div>
  )
}

"use client"

import { useSearchParams } from "next/navigation"
import { createPortal } from "react-dom"
import Button from "@/components/shared/button/Button"
import { useStopwatch } from "@/hooks/time/useStopwatch"
import { useEffect } from "react"
import type { SessionPayload } from "@/recoil/atoms/user"

export const leaveRoomEventName = "kernel-room-leave"
export interface LeaveRoomDetail {
  user: NonNullable<SessionPayload>
  isPopup: boolean
}
export interface PopupMessage {
  type: "leave" | "enter" | "finished" | "loginRequired"
  user: NonNullable<SessionPayload>
}

interface ChatRoomHeaderProps {
  articleTitle: string
  user: NonNullable<SessionPayload>
  startDate: string
}

function ChatRoomHeader({
  articleTitle,
  user,
  startDate,
}: ChatRoomHeaderProps) {
  const portalContainer = document.getElementById("chat-room-header")

  return portalContainer
    ? createPortal(
        <Header
          articleTitle={articleTitle}
          user={user}
          startDate={startDate}
        />,
        portalContainer,
      )
    : null
}

export default ChatRoomHeader

function Header({ articleTitle, user, startDate }: ChatRoomHeaderProps) {
  const searchParams = useSearchParams()
  const isPopup = !!searchParams.get("popup")

  const onLeaveRoom = () => {
    window.dispatchEvent(
      new CustomEvent(leaveRoomEventName, {
        detail: {
          user,
          isPopup,
        } as LeaveRoomDetail,
      }),
    )

    if (isPopup) {
      ;(window.opener.postMessage as typeof window.postMessage)(
        { type: "leave", user } as PopupMessage,
        window.location.origin,
      )

      window.close()
    }
  }

  return (
    <section>
      <div className="w-full flex justify-end items-center gap-2">
        <h4 className="text-sm">남은 시간</h4>
        <ChatTimer startDate={startDate} />
      </div>
      <div className="w-full flex justify-between items-center px-2 py-1 box-border bg-colorsLightGray font-bold text-secondary">
        <h3>{articleTitle}</h3>
        <Button buttonTheme="secondary" onClick={onLeaveRoom}>
          나가기
        </Button>
      </div>
    </section>
  )
}

function ChatTimer({ startDate }: { startDate: string }) {
  const { start, diffTime } = useStopwatch({
    startDate,
    seconds: 60 * 30,
    stopAfterTargetTime: true,
    callback({ isAfter }) {
      if (isAfter) {
        //
      }
    },
  })

  useEffect(() => {
    start()
  }, []) /* eslint-disable-line */

  return (
    <div className="w-[40px] flex items-center text-xs font-bold text-secondary">
      <span>{`${diffTime.minute}`.padStart(2, "0")}</span>
      <span className="text-xs">&nbsp;:&nbsp;</span>
      <span>{`${diffTime.second}`.padStart(2, "0")}</span>
    </div>
  )
}

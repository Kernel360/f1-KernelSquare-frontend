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
  popupWindow?: Window | null
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
  return (
    <Header articleTitle={articleTitle} user={user} startDate={startDate} />
  )
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
        process.env.NEXT_PUBLIC_SITE_URL!,
      )

      window.close()
    }
  }

  return (
    <section className="sticky top-0 w-full bg-white z-[2]">
      <div className="w-full flex justify-end items-center gap-2">
        <h4 className="text-sm">남은 시간</h4>
        <ChatTimer startDate={startDate} />
      </div>
      <div className="w-full flex gap-2 justify-between items-center px-2 py-1 box-border bg-colorsLightGray font-bold text-secondary">
        <h3>{articleTitle}</h3>
        <Button
          buttonTheme="secondary"
          className="shrink-0"
          onClick={onLeaveRoom}
        >
          나가기
        </Button>
      </div>
      <div className="absolute left-0 -bottom-9 h-9 box-border w-full bg-gradient-to-t from-white/0 to-white pointer-events-none" />
    </section>
  )
}

function ChatTimer({ startDate }: { startDate: string }) {
  const { start, diffTime } = useStopwatch({
    startDate,
    seconds: 0,
    stopAfterTargetTime: true,
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

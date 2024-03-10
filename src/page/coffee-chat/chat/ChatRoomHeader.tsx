"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/shared/button/Button"
import { useStopwatch } from "@/hooks/time/useStopwatch"
import { useEffect, useLayoutEffect, useRef } from "react"
import {
  ConnectSuccessDetail,
  connectSuccessEventname,
} from "@/socket/client/SocketConnection"
import { CompatClient } from "@stomp/stompjs"
import {
  addPopupStorageItem,
  hasPopup,
  removePopupStorageItem,
} from "@/util/chat/popup"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import type { SessionPayload } from "@/recoil/atoms/user"

dayjs.extend(utc)

export interface PopupMessage {
  user: NonNullable<SessionPayload>
  isRoomMember?: boolean
  reservationId: number
  type:
    | "leave"
    | "enter"
    | "finished"
    | "loginRequired"
    | "reLogin"
    | "popupOpen"
    | "popupClose"
}

interface ChatRoomHeaderProps {
  articleTitle: string
  roomKey: string
  reservationId: number
  user: NonNullable<SessionPayload>
  startDate: string
}

function ChatRoomHeader({
  articleTitle,
  roomKey,
  reservationId,
  user,
  startDate,
}: ChatRoomHeaderProps) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const isPopup = !!searchParams.get("popup")

  const stompRef = useRef<CompatClient | null>(null)

  const onLeaveRoom = () => {
    if (isPopup) {
      window.close()

      return
    }

    setTimeout(() => {
      router?.replace("/chat?page=0")
    }, 0)
  }

  useLayoutEffect(() => {
    if (!hasPopup({ reservationId })) {
      addPopupStorageItem({ reservationId })

      window.dispatchEvent(new StorageEvent("storage"))
    }

    const handleConnectSuccess = (e: CustomEvent) => {
      const { stomp } = e.detail as ConnectSuccessDetail

      stompRef.current = stomp
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (stompRef.current) return

      if (isPopup) {
        ;(window.opener?.postMessage as typeof window.postMessage)(
          { type: "popupClose", user, reservationId } as PopupMessage,
          process.env.NEXT_PUBLIC_SITE_URL!,
        )

        return
      }

      removePopupStorageItem({ reservationId })
      window.dispatchEvent(new StorageEvent("storage"))
    }

    window.addEventListener(
      connectSuccessEventname as any,
      handleConnectSuccess,
    )

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener(
        connectSuccessEventname as any,
        handleConnectSuccess,
      )

      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) /* eslint-disable-line */

  return (
    <section
      className={`z-[2] bg-white ${
        isPopup
          ? "sticky top-0 w-full"
          : "fixed w-full left-0 top-[calc(var(--height-header)+67px)] sm:left-[200px] sm:top-[calc(var(--height-header))] sm:w-[calc(100%-200px)]"
      }`}
    >
      <div className="w-full box-border flex justify-end items-center gap-2 pr-2">
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

export default ChatRoomHeader

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

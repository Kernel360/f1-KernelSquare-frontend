"use client"

import { SessionPayload } from "@/recoil/atoms/user"
import { initSocket } from "../provider"
import { useEffect, useState } from "react"
import { RoomAtomFamily } from "@/recoil/atoms/socket/socketAtom"
import { useSetRecoilState } from "recoil"
import {
  LeaveRoomDetail,
  PopupMessage,
  leaveRoomEventName,
} from "@/page/coffee-chat/chat/ChatRoomHeader"
import { useRouter, useSearchParams } from "next/navigation"
import { CompatClient, ActivationState } from "@stomp/stompjs"
import dayjs from "dayjs"
import { revalidatePage } from "@/util/actions/revalidatePage"

export const connectSuccessEventname = "kernel-ws-connect-success"
export interface ConnectSuccessDetail {
  stomp: CompatClient
}

interface SocketConnectionProps {
  serverUrl: string
  roomKey: string
  user: NonNullable<SessionPayload>
}

function SocketConnection({ serverUrl, roomKey, user }: SocketConnectionProps) {
  const { replace } = useRouter()
  const [errorState, setErrorState] = useState<Error | null>(null)
  const setRoom = useSetRecoilState(RoomAtomFamily({ roomKey }))

  const searchParams = useSearchParams()
  const isPopup = searchParams.get("popup")

  useEffect(() => {
    const { socket, stomp, success, error } = initSocket(serverUrl)

    if (success) {
      if (socket && stomp) {
        stomp.onWebSocketClose = (evt) => {
          if (evt.reason === "Cannot connect to server") {
            setErrorState(new Error("cannotConnect"))
          }
        }

        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent(connectSuccessEventname, {
              detail: {
                stomp,
              } as ConnectSuccessDetail,
            }),
          )
        }, 0)

        stomp.connect({}, () => {
          stomp.subscribe(`/topic/chat/room/${roomKey}`, (message) => {
            const payload = JSON.parse(message.body)

            setRoom((prev) => ({
              ...prev,
              messages: [
                ...prev.messages,
                {
                  ...payload,
                },
              ],
            }))
          })

          stomp.send(
            `/app/chat/message`,
            {},
            JSON.stringify({
              type: "ENTER",
              room_key: roomKey,
              sender: user.nickname,
              send_time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
            }),
          )
        })
      }
    }

    if (error) {
      setErrorState(error)
    }

    const handleLeave = (e: CustomEvent) => {
      const { user: leaveUser, isPopup } = e.detail as LeaveRoomDetail

      if (!isPopup) {
        setTimeout(() => {
          replace("/chat")
        }, 0)
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      stomp?.send(
        `/app/chat/message`,
        {},
        JSON.stringify({
          type: "LEAVE",
          room_key: roomKey,
          sender: user.nickname,
          send_time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        }),
      )
      ;(window.opener.postMessage as typeof window.postMessage)(
        { type: "leave", user } as PopupMessage,
        process.env.NEXT_PUBLIC_SITE_URL!,
      )
    }

    const handleMessage = (e: MessageEvent) => {
      if (typeof window === "undefined") return
      if (e.origin !== process.env.NEXT_PUBLIC_SITE_URL!) return

      const { type } = e.data

      if (type !== "deleteUser") return

      if (type === "deleteUser") {
        stomp?.send(
          `/app/chat/message`,
          {},
          JSON.stringify({
            type: "LEAVE",
            room_key: roomKey,
            sender: user.nickname,
            send_time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
          }),
        )

        revalidatePage("*")
      }
    }

    if (success) {
      if (isPopup) {
        window.addEventListener("message", handleMessage)
      }

      window.addEventListener(leaveRoomEventName as any, handleLeave)
      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      if (isPopup) {
        window.removeEventListener("message", handleMessage)
      }

      window.removeEventListener(leaveRoomEventName as any, handleLeave)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) /* eslint-disable-line */

  if (errorState) throw errorState

  return null
}

export default SocketConnection

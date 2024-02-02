"use client"

import { SessionPayload } from "@/recoil/atoms/user"
import { initSocket } from "../provider"
import { useEffect, useState } from "react"
import { RoomAtomFamily } from "@/recoil/atoms/socket/socketAtom"
import { useSetRecoilState } from "recoil"
import {
  LeaveRoomDetail,
  leaveRoomEventName,
} from "@/page/coffee-chat/chat/ChatRoomHeader"
import { useRouter } from "next/navigation"
import { CompatClient, ActivationState } from "@stomp/stompjs"
import dayjs from "dayjs"

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

      stomp?.send(
        `/app/chat/message`,
        {},
        JSON.stringify({
          type: "LEAVE",
          room_key: roomKey,
          sender: leaveUser.nickname,
          send_time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        }),
      )

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
    }

    if (success) {
      window.addEventListener(leaveRoomEventName as any, handleLeave)
      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      window.removeEventListener(leaveRoomEventName as any, handleLeave)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) /* eslint-disable-line */

  if (errorState) throw errorState

  return null
}

export default SocketConnection

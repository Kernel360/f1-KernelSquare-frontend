"use client"

import { SessionPayload } from "@/recoil/atoms/user"
import { initSocket } from "../provider"
import { useEffect, useRef, useState } from "react"
import {
  MessagePayload,
  RoomAtomFamily,
} from "@/recoil/atoms/socket/socketAtom"
import { useSetRecoilState } from "recoil"
import { PopupMessage } from "@/page/coffee-chat/chat/ChatRoomHeader"
import { useRouter, useSearchParams } from "next/navigation"
import { CompatClient } from "@stomp/stompjs"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { revalidatePage } from "@/util/actions/revalidatePage"

dayjs.extend(utc)

export interface ConnectSuccessDetail {
  stomp: CompatClient
}

interface SocketConnectionProps {
  serverUrl: string
  roomKey: string
  reservationId: number
  user: NonNullable<SessionPayload>
}

export const connectSuccessEventname = "kernel-ws-connect-success"

function SocketConnection({
  serverUrl,
  roomKey,
  reservationId,
  user,
}: SocketConnectionProps) {
  const router = useRouter()
  const [errorState, setErrorState] = useState<Error | null>(null)

  const leaveCase = useRef<"EXPIRE" | "DUPPLICATE_LOGIN" | "CLOSE">("CLOSE")

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
          stomp.disconnectHeaders = {
            memberId: `${user.member_id}`,
            roomKey,
          }

          stomp.subscribe(
            `/topic/chat/room/${roomKey}`,
            (message) => {
              const payload = JSON.parse(message.body) as MessagePayload

              const type = payload.type as MessagePayload["type"]

              if (type === "EXPIRE") {
                leaveCase.current = "EXPIRE"

                stomp?.send(
                  `/app/chat/message`,
                  {},
                  JSON.stringify({
                    type: "LEAVE",
                    room_key: roomKey,
                    sender: user.nickname,
                    sender_id: user.member_id,
                    send_time: dayjs().utc().format(),
                  }),
                )
                ;(window.opener?.postMessage as typeof window.postMessage)(
                  { type: "finished", user, reservationId } as PopupMessage,
                  process.env.NEXT_PUBLIC_SITE_URL!,
                )

                if (isPopup) {
                  window.close()

                  return
                }

                router?.replace("/chat?page=0")

                return
              }

              setRoom((prev) => ({
                ...prev,
                ...((type === "ENTER" || type === "LEAVE") && {
                  memberList: payload.member_list ?? [],
                }),
                messages: [
                  ...prev.messages,
                  {
                    ...payload,
                  },
                ],
              }))
            },
            { memberId: `${user.member_id}` },
          )

          stomp.send(
            `/app/chat/message`,
            {},
            JSON.stringify({
              type: "ENTER",
              room_key: roomKey,
              sender: user.nickname,
              sender_id: user.member_id,
              send_time: dayjs().utc().format(),
            }),
          )
        })
      }
    }

    if (error) {
      setErrorState(error)
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (leaveCase.current === "CLOSE") {
        stomp?.send(
          `/app/chat/message`,
          {},
          JSON.stringify({
            type: "LEAVE",
            room_key: roomKey,
            sender: user.nickname,
            sender_id: user.member_id,
            send_time: dayjs().utc().format(),
          }),
        )

        if (isPopup) {
          ;(window.opener?.postMessage as typeof window.postMessage)(
            { type: "popupClose", user, reservationId } as PopupMessage,
            process.env.NEXT_PUBLIC_SITE_URL!,
          )

          return
        }

        return
      }
    }

    /*
      opener(부모) window 가 보낸 메시지를 수신
    */
    const handleMessage = (e: MessageEvent) => {
      if (typeof window === "undefined") return
      if (e.origin !== process.env.NEXT_PUBLIC_SITE_URL!) return

      const { type } = e.data

      if (type === "deleteUser") {
        stomp?.send(
          `/app/chat/message`,
          {},
          JSON.stringify({
            type: "LEAVE",
            room_key: roomKey,
            sender: user.nickname,
            sender_id: user.member_id,
            send_time: dayjs().utc().format(),
          }),
        )

        revalidatePage("*")

        return
      }
    }

    if (success) {
      if (isPopup) {
        window.addEventListener("message", handleMessage)
      }

      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      if (isPopup) {
        window.removeEventListener("message", handleMessage)
      }

      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) /* eslint-disable-line */

  if (errorState) throw errorState

  return null
}

export default SocketConnection

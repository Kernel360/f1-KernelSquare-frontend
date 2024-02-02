import { atomFamily } from "recoil"

export interface MessagePayload {
  type: "ENTER" | "TALK" | "LEAVE" | "CODE" | "EXPIRE"
  room_key: string
  sender: string
  message: string
  sendTime?: string
}

interface Room {
  messages: Array<MessagePayload>
}

export const RoomAtomFamily = atomFamily<Room, { roomKey: string }>({
  key: "socket-room-atom-family",
  default: {
    messages: [],
  },
})

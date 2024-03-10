import { atomFamily } from "recoil"

export interface ChatRoomMember {
  member_id: number
  nickname: string
  member_image_url: string | null
}

export interface MessagePayload {
  type: "ENTER" | "TALK" | "LEAVE" | "CODE" | "EXPIRE"
  room_key: string
  sender_id: number
  sender: string
  sender_image_url: string | null
  message: string
  send_time: string
  member_list: Array<ChatRoomMember>
}

interface Room {
  messages: Array<MessagePayload>
  memberList: Array<ChatRoomMember>
}

export const RoomAtomFamily = atomFamily<Room, { roomKey: string }>({
  key: "socket-room-atom-family",
  default: {
    messages: [],
    memberList: [],
  },
})

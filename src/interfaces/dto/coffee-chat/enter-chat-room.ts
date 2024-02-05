import { APIResponse } from "../api-response"

export interface EnterChatRoomRequest {
  member_id: number
  room_id: number
  article_title: string
}

export interface EnterChatRoomPayload {
  article_title: string
  room_key: string
  active: boolean
  expiration_time: string
}

export interface EnterChatRoomResponse
  extends APIResponse<EnterChatRoomPayload> {}

import { APIResponse } from "../api-response"

export interface EnterChatRoomRequest {
  article_title: string
  reservation_id: number
}

export interface EnterChatRoomPayload {
  article_title: string
  room_key: string
  active: boolean
  expiration_time: string
}

export interface EnterChatRoomResponse
  extends APIResponse<EnterChatRoomPayload> {}

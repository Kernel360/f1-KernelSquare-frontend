import type { APIResponse } from "../api-response"

export interface GetMyCoffeeChatReservationRequest {}

export interface MyCoffeeChatReservation {
  reservation_id: number
  room_id: number
  start_time: string
  mentee_nickname: string
  mentee_image_url: string
}

export interface MyCoffeeChatReservationListPayload {
  reservation_responses: Array<MyCoffeeChatReservation>
}

export interface GetMyCoffeeChatReservationListResponse
  extends APIResponse<MyCoffeeChatReservationListPayload> {}

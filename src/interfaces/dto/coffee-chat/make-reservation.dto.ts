import { APIResponse } from "../api-response"

export interface MakeReservationRequest {
  reservation_article_id: number
  reservation_id: number
  member_id: number
  reservation_start_time: string
}

export interface MakeReservationPayload {
  reservation_id: number
}

export interface MakeReservationResponse
  extends APIResponse<MakeReservationPayload> {}

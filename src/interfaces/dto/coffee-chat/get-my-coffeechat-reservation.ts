import type { APIPagenationResponse } from "../api-response"

export interface GetMyCoffeeChatReservationRequest {}

export interface MyCoffeeChatReservation {
  reservatoin_id: number
  room_id: number
  start_time: string
  mentiNickname: string
  menti_image_url: string
}

export interface MyCoffeeChatReservationListPayload {
  reservationResponseList: Array<MyCoffeeChatReservation>
}

export interface GetMyCoffeeChatReservationListResponse
  extends APIPagenationResponse<MyCoffeeChatReservationListPayload> {}

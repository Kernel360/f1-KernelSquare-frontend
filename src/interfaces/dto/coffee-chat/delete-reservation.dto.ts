import { APIResponse } from "../api-response"

export interface DeleteReservationRequest {
  reservationId: number
}

export interface DeleteReservationResponse extends APIResponse {}

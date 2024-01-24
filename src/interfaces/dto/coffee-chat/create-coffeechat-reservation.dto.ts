import type { APIResponse } from "../api-response"

/**
  `hash_tag`는 최대 10자, 최대 가능 개수는 5개
*/
export interface CreateCoffeeChatReservationRequest {
  member_id: number
  title: string
  content: string
  hash_tags: Array<string>
  date_times: Array<string>
}

export interface CreateCoffeeChatReservationPayload {
  reservation_article_id: number
}

export interface CreateCoffeeChatReservationResponse
  extends APIResponse<CreateCoffeeChatReservationPayload> {}

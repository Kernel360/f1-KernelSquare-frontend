import type { APIResponse } from "../api-response"

export interface GetCoffeeChatReservationDetailRequest {
  postId: number
}

export interface CoffeeChatReservationTime {
  start_time: string
  finished: boolean
  menti_nickname: string | null
  menti_image_url: string | null
}

export interface CoffeeChatReservationDetailPayload {
  article_id: number
  member_id: number
  nickname: string
  member_image_url: string
  level: number
  level_image_url: string
  title: string
  content: string
  hash_tag_list: Array<string>
  date_times: CoffeeChatReservationTime
  created_date: string
  modified_date: string
}

export interface GetCoffeeChatReservationDetailResponse
  extends APIResponse<CoffeeChatReservationDetailPayload> {}

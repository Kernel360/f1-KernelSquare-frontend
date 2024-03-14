import type { APIResponse } from "../api-response"

const enum Changed {
  REMOVE = "remove",
  ADD = "add",
}

type ChangeHashTag = {
  hashtag_id: number | null
  content: string
  changed: Changed
}

type ChangeReservation = {
  reservation_id: number | null
  start_time: string
  changed: Changed
}

export interface UpdateCoffeeChatPostRequest {
  member_id: number
  article_id: number
  title: string
  content: string
  introduction: string
  change_hashtags?: Array<ChangeHashTag>
  chage_reservations?: Array<ChangeReservation>
}

export interface UpdateCoffeeChatPostPayload {
  reservation_article_id: number
}

export interface UpdateCoffeeChatPostResponse
  extends APIResponse<UpdateCoffeeChatPostPayload> {}

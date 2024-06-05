import type { APIResponse } from "../api-response"

export const COFFEE_CHAT_CHANGE = {
  REMOVE: "remove",
  ADD: "add",
} as const

type CoffeeChatChange =
  (typeof COFFEE_CHAT_CHANGE)[keyof typeof COFFEE_CHAT_CHANGE]

export type ChangeHashTag = {
  hashtag_id: number | null
  content: string
  changed: CoffeeChatChange
}

export type ChangeReservation = {
  reservation_id: number | null
  start_time: string
  changed: CoffeeChatChange
}

export interface UpdateCoffeeChatPostRequest {
  member_id: number
  article_id: number
  title: string
  content: string
  introduction: string
  change_hashtags?: Array<ChangeHashTag>
  change_reservations?: Array<ChangeReservation>
}

export interface UpdateCoffeeChatPostResponse extends APIResponse {}

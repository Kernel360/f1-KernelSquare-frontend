import type { APIResponse } from "../api-response"

/**
  `hash_tag`는 최대 10자, 최대 가능 개수는 10개
*/
export interface CreateCoffeeChatPostRequest {
  member_id: number
  title: string
  content: string
  hash_tags: Array<string>
  date_times: Array<string>
  introduction: string
}

export interface CreateCoffeeChatPostPayload {
  reservation_article_id: number
}

export interface CreateCoffeeChatPostResponse
  extends APIResponse<CreateCoffeeChatPostPayload> {}

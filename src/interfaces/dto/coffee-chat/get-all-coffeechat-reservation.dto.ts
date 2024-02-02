import type { APIPagenationResponse, PaginationParams } from "../api-response"

/**
 full_check
  
- `UnAvailable` true(1): 예약 불가
- `Available` false(0): 예약 가능 
*/
export const enum CoffeeChatReservationStatus {
  Available = 0,
  UnAvailable = 1,
}

export interface CoffeeChatReservationHashTag {
  hashtag_id: number
  content: string
}

export interface GetCoffeeChatReservationListRequest extends PaginationParams {}

export interface CoffeeChatReservation {
  article_id: number
  member_id: number
  nickname: string
  member_image_url: string
  level: number
  level_image_url: string
  title: string
  content: string
  hashtags: string[]
  created_date: string
  modified_date: string
  article_status: boolean
  full_check: number
}

export interface CoffeeChatReservationListPayload {
  list: Array<CoffeeChatReservation>
}

export interface GetCoffeeChatReservationListResponse
  extends APIPagenationResponse<CoffeeChatReservationListPayload> {}

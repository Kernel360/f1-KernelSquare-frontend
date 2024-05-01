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
  member_image_url: string | null
  level: number
  level_image_url: string
  title: string
  introduction: string | null
  hash_tag_list: string[]
  created_date: string
  modified_date: string
  article_status: boolean // 마감 여부
  coffee_chat_count: number // 이전 커피챗 진행 횟수
  available_reservation_count: number // 현재 예약 가능한 수
  total_reservation_count: number // 전체 예약 수
}

export interface CoffeeChatReservationListPayload {
  list: Array<CoffeeChatReservation>
}

export interface GetCoffeeChatReservationListResponse
  extends APIPagenationResponse<CoffeeChatReservationListPayload> {}

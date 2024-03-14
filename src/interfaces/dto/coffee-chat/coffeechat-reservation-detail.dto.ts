import type { APIResponse } from "../api-response"
import { CoffeeChatReservationHashTag } from "./get-all-coffeechat-reservation.dto"

export interface GetCoffeeChatReservationDetailRequest {
  postId: number
}

/**
 * reservation_id: 예약 id
 * room_id": 채팅방 id
 * reservation_start_time: 커피챗 시작 시간
 * mentee_nickname: 예약한 멘티 닉네임
 * mentee_image_url: 예약한 멘티 프로필 사진
 */
export interface CoffeeChatReservationTime {
  reservation_id: number
  room_id: number
  start_time: string
  mentee_nickname: string | null
  mentee_image_url: string | null
}

export interface CoffeeChatReservationDetailPayload {
  article_id: number
  member_id: number
  nickname: string
  member_image_url: string | null
  level: number
  level_image_url: string
  title: string
  content: string
  hashtags: CoffeeChatReservationHashTag[]
  date_times: CoffeeChatReservationTime[]
  created_date: string
  modified_date: string
}

export interface GetCoffeeChatReservationDetailResponse
  extends APIResponse<CoffeeChatReservationDetailPayload> {}

import { User } from "./user"

/**
 * Answer (답변)
 *
 * ---
 *
 * **answer_id** id(number)
 *
 * **question_id** 질문id(number)
 *
 * **content** 답변 본문(string)
 *
 * **rank_image_url** 답변한 유저 레벨 이미지(string)
 *
 * **member_image_url** 답변한 유저 프로필 이미지(string)
 *
 * **create_by** 답변한 유저 닉네임(string)
 *
 * **answer_image_url** 답변에 포함된 이미지(string)
 *
 * **created_date** 답변 생성일(Date)
 *
 * **modified_date** 답변 수정일(Date)
 *
 * **vote_count** 답변 추천수(number)
 */
export interface Answer extends Pick<User, "image_url"> {
  answer_id: number
  question_id: number
  content: string
  level: number
  rank_image_url: string
  member_image_url: string
  created_by: string
  answer_image_url: string
  created_date: string
  modified_date: string
  vote_count: number
}

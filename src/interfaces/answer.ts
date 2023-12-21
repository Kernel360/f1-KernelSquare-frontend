import { User } from "./user"

/**
 * Answer (답변)
 *
 * ---
 *
 * **id** id(number)
 *
 * **question_id** 질문id(number)
 *
 * **content** 답변 본문(string)
 *
 * **rank** 레벨(number) : User
 *
 * **image_url** 답변한 유저 프로필이미지(string) : User
 *
 * **created_date** 답변 생성일(Date)
 *
 * **modified_date** 답변 수정일(Date)
 *
 * **vote_count** 답변 추천수(number)
 */
export interface Answer extends Pick<User, "image_url"> {
  id: number
  question_id: number
  content: string
  rank: number
  created_date: string
  modified_date: string
  vote_count: number
}

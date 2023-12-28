import { Answer } from "./answer"
import { TechTag } from "./tech-tag"
import { User } from "./user"

/**
 * Question(질문)
 *
 * ---
 *
 * **id** id (number)
 *
 * **title** 제목(string)
 *
 * **content** 본문 내용(string)
 *
 * **question_image_url** 질문 이미지(string)
 *
 * **view_count** 조회수(number)
 *
 * **close_status** 마감 상태(boolean)
 *
 * **nickname** 작성자 닉네임(string)
 *
 * **member_image_url** 작성자 이미지(string)
 *
 * **level** 작성자 등급(number)
 *
 * **level_image_url** 작성자 등급 이미지(string)
 *
 * **skills** 질문 기술 스택(string[]) : TechTag[]
 *
 * **created_date** 질문 생성 날짜(string)
 *
 * **modified_date** 질문 수정 날짜(string)
 *
 * **list** 해당 질문에 대한 답변들: Answer[]
 *
 */
export interface Question extends Pick<User, "level" | "image_url"> {
  id: number
  title: string
  content: string
  question_image_url: string
  view_count: number
  close_status: boolean
  nickname: string
  member_image_url: string
  level: number
  level_image_url: string
  skills: Array<TechTag>
  created_date: string
  modified_date: string
  list: Array<Answer>
}

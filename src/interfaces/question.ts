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
 * **view_count** 조회수(number)
 *
 * **level** 유저 레벨(number) : Rank
 *
 * **image_url** 유저 프로필이미지(string?) : User
 *
 * **created_by** 작성자(string) 추후 변경 가능
 *
 * **created_date** 생성일자(Date)
 *
 * **modified_date** 수정일자(Date)
 *
 * **due_date** 질문 만료일자(Date)
 *
 * **skills** 질문 기술 태그(string[]) : TechTag[]
 */
export interface Question extends Pick<User, "level" | "image_url"> {
  id: number
  title: string
  content: string
  view_count: number
  created_by: string
  created_date: string
  modified_date: string
  due_date: string
  skills: Array<TechTag>
}

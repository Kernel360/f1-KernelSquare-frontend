import { HttpStatusCode } from "axios"
import { QnaApiStatus } from "./qna"
import { MemberApiStatus } from "./member"
import { AuthApiStatus } from "./auth"
import { ImageApiStatus } from "./image"
import { SearchApiStatus } from "./search"

type ResponseCase = keyof typeof HttpStatusCode

export interface Status {
  Code: number
  HttpStatus: number
}

export type ApiStatus = Partial<Record<ResponseCase, Status>>
type ApiStatusMap = Record<string, Record<string, ApiStatus>>

export const ApiStatus = {
  /**
   * 질문 관련 api status
   *
   * `getAllQuestions`: 모든 질문 조회
   *
   * `getQuestion`: 특정 질문 조회
   *
   * `createQuestion`: 질문 생성
   *
   * `updateQuestion`: 질문 수정
   *
   * `deleteQuestion`: 질문 삭제
   */
  QnA: QnaApiStatus,
  /**
   * 회원 관련 api status
   *
   * `getMember`: 회원 정보 조회
   *
   * `updateMember`: 회원 정보 수정
   *
   * `upaatePassword`: 회원 패스워드 수정
   *
   * `withdrawal`: 회원 탈퇴
   */
  Member: MemberApiStatus,
  /**
   * auth 관련 api status
   *
   * `login`: 로그인
   *
   * `signup`: 회원 가입
   *
   * `duplicateCheckEmail`: 이메일 중복 체크
   *
   * `duplicateCheckNickname`: 닉네임 중복 체크
   *
   * `logout`: 로그아웃
   */
  Auth: AuthApiStatus,
  /**
   * 이미지 관련 api status
   *
   * `upload`: 이미지 업로드
   *
   * `delete`: 이미지 삭제
   *
   */
  Image: ImageApiStatus,
  Search: SearchApiStatus,
} satisfies ApiStatusMap

import { HttpStatusCode } from "axios"
import { ApiStatus } from "./api"

export const SearchApiStatus = {
  /**
   *  질문 목록 검색 관련 api status
   */
  searchQuestionList: {
    /**
     * 질문 목록 검색 성공
     */
    Ok: {
      Code: 2540,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (질문 목록 검색) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (질문 목록 검색) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (질문 목록 검색) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (질문 목록 검색) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (질문 목록 검색) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<string, ApiStatus>

import { HttpStatusCode } from "axios"
import { ApiStatus } from "./api"

export const QnaApiStatus = {
  /**
   * 모든 질문 조회 관련 api status
   */
  getAllQuestions: {
    /**
     * 모든 질문 조회 성공
     */
    Ok: {
      Code: 2142,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 존재하지 않는 페이지
     */
    NotFound: {
      Code: 2101,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (모든 질문 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (모든 질문 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 특정 질문 조회 관련 api status
   */
  getQuestion: {
    /**
     * 특정 질문 조회 성공
     */
    Ok: {
      Code: 2141,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 존재하지 않는 질문
     */
    NotFound: {
      Code: 2100,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (특정 질문 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
    /**
     * (특정 질문 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 질문 생성 관련 api status
   */
  createQuestion: {
    /**
     * 질문 생성 성공
     */
    Ok: {
      Code: 2140,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (질문 생성) 잘못된 요청
     */
    BadRequest: {
      Code: 9001,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (질문 생성) 존재하지 않는 회원
     */
    NotFound: {
      Code: 1201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (질문 생성) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 질문 수정 관련 api status
   */
  updateQustion: {
    /**
     * 질문 수정 성공
     */
    Ok: {
      Code: 2143,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (질문 수정) 잘못된 요청
     */
    BadRequest: {
      Code: 9001,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (질문 수정) 인증 실패
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (질문 수정) 존재하지 않는 질문
     */
    NotFound: {
      Code: 2100,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (질문 수정) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 질문 삭제 관련 api status
   */
  deleteQustion: {
    /**
     * 질문 삭제 성공
     */
    Ok: {
      Code: 2144,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (질문 삭제) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (질문 삭제) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<string, ApiStatus>

import { HttpStatusCode } from "axios"
import { ApiStatus } from "./api"

export const TechStackApiStatus = {
  /**
   *  기술 스택 생성 관련 api status
   */
  createTechStack: {
    /**
     * 기술 스택 생성 성공
     */
    Ok: {
      Code: 2346,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (기술 스택 생성) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (기술 스택 생성) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (기술 스택 생성) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (기술 스택 생성) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (기술 스택 생성) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
    /**
     * (기술 스택 생성) 이미 존재하는 기술 스택
     */
    Conflict: {
      Code: 2306,
      HttpStatus: HttpStatusCode.Conflict,
    },
  },
  /**
   * 기술 스택 모두 조회 관련 api status
   */
  getAllTechStacks: {
    /**
     * 기술 스택 모두 조회 성공
     */
    Ok: {
      Code: 2347,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (기술 스택 모두 조회) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (기술 스택 모두 조회) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (기술 스택 모두 조회) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (기술 스택 모두 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (기술 스택 모두 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 기술 스택 수정 관련 api status
   */
  updateTechStack: {
    /**
     * 기술 스택 수정 성공
     */
    Ok: {
      Code: 2348,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (기술 스택 수정) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (기술 스택 수정) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (기술 스택 수정) 존재하지 않는 기술 스택
     */
    NotFound: {
      Code: 2305,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (기술 스택 수정) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (기술 스택 수정) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 기술 스택 삭제 관련 api status
   */
  deleteTechStack: {
    /**
     * 기술 스택 삭제 성공
     */
    Ok: {
      Code: 2349,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (기술 스택 삭제) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (기술 스택 삭제) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (기술 스택 수정) 존재하지 않는 기술 스택
     */
    NotFound: {
      Code: 2305,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (기술 스택 삭제) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (기술 스택 삭제) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<string, ApiStatus>

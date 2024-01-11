import { HttpStatusCode } from "axios"
import { ApiStatus, Status } from "./api"

type LoginExpandStatusType = {
  NotMatchedUser?: Status
  NotMatchedPassword?: Status
}

type SignupExpandStatusType = {
  NotFoundRole?: Status
  NotFoundGrade?: Status
}

type LogoutExpandStatusType = {
  TokenError?: Status
}

export const AuthApiStatus = {
  /**
   * 로그인 관련 api status
   */
  login: {
    /**
     * 로그인 성공
     */
    Ok: {
      Code: 1140,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 계정 정보 일치하지 않음
     */
    NotMatchedUser: {
      Code: 1100,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * 패스워드 일치하지 않음
     */
    NotMatchedPassword: {
      Code: 1101,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (로그인) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (로그인) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 회원 가입 api status
   */
  signup: {
    /**
     * 회원 가입 성공
     */
    Ok: {
      Code: 1141,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 존재하지 않는 권한
     */
    NotFoundRole: {
      Code: 1500,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * 존재하지 않는 등급
     */
    NotFoundGrade: {
      Code: 1400,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (회원 가입) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (회원 가입) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 이메일 중복 체크 api status
   */
  duplicateCheckEmail: {
    /**
     * 중복 확인 성공(중복되는 이메일 없음)
     */
    Ok: {
      Code: 1142,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 사용중인 이메일
     */
    Conflict: {
      Code: 1103,
      HttpStatus: HttpStatusCode.Conflict,
    },
    /**
     * (이메일 중복 체크) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (이메일 중복 체크) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 닉네임 중복 체크 api status
   */
  duplicateCheckNickname: {
    /**
     * 중복 확인 성공(중복되는 닉네임 없음)
     */
    Ok: {
      Code: 1143,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 사용중인 닉네임
     */
    Conflict: {
      Code: 1102,
      HttpStatus: HttpStatusCode.Conflict,
    },
    /**
     * (닉네임 중복 체크) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (닉네임 중복 체크) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 로그아웃 api status
   */
  logout: {
    /**
     * 로그아웃 성공
     */
    Ok: {
      Code: 1305,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 토큰 처리 에러
     */
    TokenError: {
      Code: 1300,
      HttpStatus: HttpStatusCode.UnprocessableEntity,
    },
    /**
     * (로그아웃) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (로그아웃) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<
  string,
  ApiStatus &
    LoginExpandStatusType &
    SignupExpandStatusType &
    LogoutExpandStatusType
>

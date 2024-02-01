import { HttpStatusCode } from "axios"
import { ApiStatus } from "./api"

export const MemberApiStatus = {
  /**
   * 회원 정보 조회 관련 api status
   */
  getMember: {
    /**
     * 회원 정보 조회 성공
     */
    Ok: {
      Code: 1240,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 인증되지 않은 회원(로그인 필요)
     */
    Unauthorized: {
      Code: 1101,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * 존재하지 않는 회원
     */
    NotFound: {
      Code: 1201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (회원 정보 조회) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 회원 정보 수정 관련 api status (자기소개 수정 + 프로필 이미지 수정)
   */
  updateMember: {
    /**
     * 회원 정보 수정 성공
     */
    Ok: {
      Code: 1242,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 인증되지 않은 회원(로그인 필요)
     */
    Unauthorized: {
      Code: 1101,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * 권한 없음(본인이 아님)
     */
    Forbidden: {
      Code: 1103,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * 존재하지 않는 회원
     */
    NotFound: {
      Code: 1201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (회원 정보 수정) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 회원 패스워드 수정 관련 api status
   */
  updatePassword: {
    /**
     * 비밀번호 수정 성공
     */
    Ok: {
      Code: 1241,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 인증되지 않은 회원(로그인 필요)
     */
    Unauthorized: {
      Code: 1101,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * 권한 없음(본인이 아님)
     */
    Forbidden: {
      Code: 1103,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * 존재하지 않는 회원
     */
    NotFound: {
      Code: 1201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (회원 패스워드 수정) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 회원 탈퇴 관련 api status
   */
  withdrawal: {
    /**
     * 회원 탈퇴 성공
     */
    Ok: {
      Code: 1243,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 인증되지 않은 회원(로그인 필요)
     */
    Unauthorized: {
      Code: 1101,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * 권한 없음(본인이 아님)
     */
    Forbidden: {
      Code: 1103,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * 존재하지 않는 회원
     */
    NotFound: {
      Code: 1201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (회원 탈퇴) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<string, ApiStatus>

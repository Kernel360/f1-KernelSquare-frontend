import { HttpStatusCode } from "axios"
import { ApiStatus } from "./api"

export const ImageApiStatus = {
  /**
   * 이미지 업로드 api status
   */
  upload: {
    /**
     * 이미지 업로드 성공
     */
    Ok: {
      Code: 2240,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (이미지 업로드) 인증 실패
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * 빈 이미지
     */
    NotFound: {
      Code: 2400,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * 이미지 업로드 실패
     */
    InternalServerError: {
      Code: 2401,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 이미지 삭제 api status
   */
  delete: {
    /**
     * 이미지 삭제 성공
     */
    Ok: {
      Code: 2441,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (이미지 삭제) 인증 실패
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (이미지 삭제) 권한 없음
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * 잘못된 URL 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (이미지 삭제) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
} satisfies Record<string, ApiStatus>

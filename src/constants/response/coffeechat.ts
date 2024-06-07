import { HttpStatusCode } from "axios"
import { ApiStatus, Status } from "./api"

type EnterChatRoomExpandStatusType = {
  InvalidMessage?: Status
  UnactiveRoom?: Status
  NotMentor?: Status
  NotMenti?: Status
  ForbiddenRole?: Status
}

type UpdateChatExpandStatusType = {
  NotChatAuthor?: Status
  MaximumHashTags?: Status
  MaximumReservations?: Status
  InvalidPeriods?: Status
}

export const CoffeeChatApiStatus = {
  /**
   * 모든 커피챗 등록글 조회 관련 api status
   */
  getAllCoffeeChatPosts: {
    /**
     * 모든 커피챗 조회 성공
     */
    Ok: {
      Code: 3142,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (커피챗 모두 조회) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (커피챗 모두 조회) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (커피챗 모두 조회) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (커피챗 모두 조회) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * () 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   *  커피챗 등록글 생성 관련 api status
   */
  createCoffeeChatPost: {
    /**
     * 커피챗 등록글 생성 성공
     */
    Ok: {
      Code: 3140,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (커피챗 등록글 생성) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (커피챗 등록글 생성) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (커피챗 등록글 생성) 존재하지 않는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    NotFound: {
      Code: -1,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (커피챗 등록글 생성) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (커피챗 등록글 생성) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
    /**
     * (커피챗 등록글 생성) 이미 존재하는 커피챗
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Conflict: {
      Code: -1,
      HttpStatus: HttpStatusCode.Conflict,
    },
  },
  /**
   * 커피챗 수정 관련 api status
   */
  updateCoffeeChatPost: {
    /**
     * (커피챗 등록글 수정) 수정 성공
     */
    Ok: {
      Code: 3144,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (커피챗 등록글 수정) 생성한 멘토와 불일치
     */
    NotChatAuthor: {
      Code: 3102,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (커피챗 등록글 수정) 최대 해시태그 수 초과
     */
    MaximumHashTags: {
      Code: 3103,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (커피챗 등록글 수정) 최대 예약 수 초과
     */
    MaximumReservations: {
      Code: 3104,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (커피챗 등록글 수정) 최대 예약 기간 초과
     */
    InvalidPeriods: {
      Code: 3105,
      HttpStatus: HttpStatusCode.BadRequest,
    },
  },
  /**
   * 커피챗 등록글 상세보기 관련 api status
   */
  getCoffeeChatPostDetail: {
    /**
     * 커피챗 등록글 상세보기 성공
     */
    Ok: {
      Code: 3141,
      HttpStatus: HttpStatusCode.Ok,
    },
    /**
     * (커피챗 등록글 상세보기) 권한이 없는 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Forbidden: {
      Code: -1,
      HttpStatus: HttpStatusCode.Forbidden,
    },
    /**
     * (커피챗 등록글 상세보기) 인증되지 않은 회원
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    Unauthorized: {
      Code: -1,
      HttpStatus: HttpStatusCode.Unauthorized,
    },
    /**
     * (커피챗 등록글 상세보기) 존재하지 않는 커피챗
     */
    NotFound: {
      Code: 3100,
      HttpStatus: HttpStatusCode.NotFound,
    },
    /**
     * (커피챗 등록글 상세보기) 잘못된 요청
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    BadRequest: {
      Code: -1,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    /**
     * (커피챗 등록글 상세보기) 서버 에러
     * - 커스텀 코드가 없어서 현재는 code를 -1로 설정함
     */
    InternalServerError: {
      Code: -1,
      HttpStatus: HttpStatusCode.InternalServerError,
    },
  },
  /**
   * 채팅방 입장 관련 api status
   */
  enterChatRoom: {
    Ok: {
      Code: 3241,
      HttpStatus: HttpStatusCode.Ok,
    },
    NotFound: {
      Code: 3201,
      HttpStatus: HttpStatusCode.NotFound,
    },
    InvalidMessage: {
      Code: 3200,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    UnactiveRoom: {
      Code: 3202,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    NotMentor: {
      Code: 3203,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    NotMenti: {
      Code: 3204,
      HttpStatus: HttpStatusCode.BadRequest,
    },
    ForbiddenRole: {
      Code: 3205,
      HttpStatus: HttpStatusCode.BadRequest,
    },
  },
} satisfies Record<
  string,
  ApiStatus & EnterChatRoomExpandStatusType & UpdateChatExpandStatusType
>

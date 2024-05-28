export const ACCESS_TOKEN_KEY = "accessToken"
export const REFRESH_TOKEN_KEY = "refreshToken"
/**
 * 액세스 토큰 secret
 *
 * 실제 서버상으로 JWT를 처리한다면
 * 환경변수로 관리하겠지만,
 * mock서버에서만 테스트 용도로
 * 사용할 목적이기 때문에
 * 상수로 관리
 */
export const JWT_ACCESS_TOKEN_SECRET = "testMockAccessTokenSecret"
/**
 * 리프레시 토큰 secret
 *
 * 실제 서버상으로 JWT를 처리한다면
 * 환경변수로 관리하겠지만,
 * mock서버에서만 테스트 용도로
 * 사용할 목적이기 때문에
 * 상수로 관리
 */
export const JWT_REFRESH_TOKEN_SECRET = "testMockRefreshTokenSecret"

export const ENCRYPTED_PAYLOAD_KEY = "_ks_ep"

export const CustomAuthorizedHeaderName = "x-kernal-authorized"
export const CustomAuthorizedHeaderValue = {
  Authorized: "true",
  UnAuthorized: "false",
}

export const USER_LOCAL_STORAGE_KEY = "user"

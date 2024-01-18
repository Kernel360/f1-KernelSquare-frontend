import {
  ACCESS_TOKEN_KEY,
  CustomAuthorizedHeaderName,
  CustomAuthorizedHeaderValue,
  ENCRYPTED_PAYLOAD_KEY,
} from "@/constants/token"
import { cookies, headers } from "next/headers"
import { decrypt } from "./crypto"
import { LoginUserPayload } from "@/interfaces/dto/auth/login.dto"

/**
 * 로그인 여부
 *
 * middleware 에 정의된 path에 유효함
 *
 * middleware에서 설정한 커스텀 헤더(x-kenal-authorized)의 값으로 판별
 *
 * @returns boolean
 *
 */
export function isLogined() {
  const customAuthHeader = headers().get(CustomAuthorizedHeaderName)

  return !!(
    customAuthHeader &&
    customAuthHeader === CustomAuthorizedHeaderValue.Authorized
  )
}

/**
 * `서버환경에서 유저 확인`
 *
 * - 서버환경에서 cookies()를 통해 유저 유무를 판별하여 유저를 리턴
 * - 클라이언트 환경에서 호출하면 안 됨
 * - 미들웨어에서 사용 지양
 * (현재 미들웨어는 `edge` 런타임에서 동작하기 때문에, 암호화와 관련된 decrypt 함수(node 런타임 환경)를 호출할 때 에러가 발생할 수 있음)
 *
 */
export function getServerSession() {
  const cookieStore = cookies()

  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value
  const payloadToken = cookieStore.get(ENCRYPTED_PAYLOAD_KEY)?.value

  const user =
    !accessToken || !payloadToken
      ? null
      : (JSON.parse(decrypt(payloadToken)) as LoginUserPayload)

  return {
    user,
  }
}

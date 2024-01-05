import {
  CustomAuthorizedHeaderName,
  CustomAuthorizedHeaderValue,
} from "@/constants/token"
import { headers } from "next/headers"

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

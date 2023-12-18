import { Rank } from "./rank"

export type UserRole = "ROLE_USER" | "ROLE_MENTOR" | "ROLE_ADMIN"

export enum ACCOUNT_STATUS {
  "FALSE" = 0,
  "TRUE" = 1,
}

/**
 * User(유저)
 *
 * ---
 *
 * **email** 이메일(string)
 *
 * **nickname** 닉네임(string)
 *
 * **experience** 경험치(number)
 *
 * **level** 레벨(number) : Rank
 *
 * **introduction** 소개글(string?)
 *
 * **image_url** 이미지 주소(string?)
 *
 * **authorities** 권한(AUTHORITIES)
 *
 * **account_status** 계정 상태 (0, 1)
 */
export interface User {
  email: string
  nickname: string
  experience: number
  level: Rank
  introduction?: string
  image_url?: string | null
  authorities: Array<UserRole>
  account_status: ACCOUNT_STATUS
}

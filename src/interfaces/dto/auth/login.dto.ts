import { LoginFormData } from "@/interfaces/form"
import { APIResponse } from "../api-response"
import { UserRole } from "@/interfaces/user"

export interface LoginRequest extends LoginFormData {}

export interface LoginUserPayload {
  member_id: number
  nickname: string
  experience: number
  introduction: string
  image_url: string
  level: number
  roles: Array<UserRole>
}

export interface LoginTokenPayload {
  token_dto: {
    access_token: string
    refresh_token: string
  }
}

export type LoginPayload = LoginUserPayload & LoginTokenPayload

/**
 * - 200 OK : `code 1140`
 *
 * - 404 Not Found
 *   - 일치하지 않는 유저: `code 1100`
 *   - 비밀번호 일치 하지 않음: `code 1101`
 *
 */
export interface LoginResponse extends APIResponse<LoginPayload> {}

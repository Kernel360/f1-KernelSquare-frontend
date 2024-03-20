import { APIResponse } from "../api-response"
import { LoginUserPayload } from "../auth/login.dto"

export interface UpdateMemberNicknameRequest
  extends Pick<LoginUserPayload, "member_id" | "nickname"> {}

export interface UpdateMemberNicknameResponse
  extends APIResponse<Omit<LoginUserPayload, "roles">> {}

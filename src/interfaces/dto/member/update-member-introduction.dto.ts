import type { User } from "@/interfaces/user"
import type { APIResponse } from "../api-response"

export interface UpdateMemberIntroductionRequest
  extends Partial<Pick<User, "introduction">> {
  memberId: number
}

export interface UpdateMemberIntroductionResponse extends APIResponse {
  code: number
  msg: string
}

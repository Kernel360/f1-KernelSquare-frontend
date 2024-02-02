import type { User } from "@/interfaces/user"
import type { APIResponse } from "../api-response"

export interface UpdateMemberProfileImageRequest
  extends Partial<Pick<User, "image_url">> {
  memberId: number
}

export interface UpdateMemberProfileImageResponse extends APIResponse {
  code: number
  msg: string
}

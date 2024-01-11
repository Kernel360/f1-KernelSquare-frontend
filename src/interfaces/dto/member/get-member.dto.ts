import { User } from "@/interfaces/user"
import { APIResponse } from "../api-response"

export interface GetMemberRequest {
  id: number
}

export type UserPayload = Pick<
  User,
  "nickname" | "experience" | "introduction" | "image_url" | "level"
> & { id: number }

export interface GetMemberResponse extends APIResponse<UserPayload> {}

import { User } from "@/interfaces/user"
import { APIResponse } from "../api-response"

export interface GetMemberRequest {
  id: number
}

type UserPayload = Omit<User, "id">

export interface GetMemberResponse extends APIResponse<UserPayload> {}

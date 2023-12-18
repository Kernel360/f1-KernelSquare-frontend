import { User } from "@/interfaces/user"
import { APIResponse } from "../api-response"

export interface UpdateMemberInfoRequest
  extends Partial<Pick<User, "nickname" | "image_url" | "introduction">> {
  id: number
}

export interface UpdateMemberInfoResponse extends APIResponse {}

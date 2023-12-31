import { APIResponse } from "../api-response"

export interface CreateVoteRequest {
  answerId: number
  member_id: number
  status: 1 | -1
}

export interface CreateVoteResponse extends APIResponse {
  code: number
  msg: string
}

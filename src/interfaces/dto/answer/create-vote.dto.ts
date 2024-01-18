import { APIResponse } from "../api-response"

enum VoteStatus {
  DISLIKED = -1,
  NONE = 0,
  LIKED = 1,
}

export interface CreateVoteRequest {
  answerId: number
  member_id: number
  status: VoteStatus
}

export interface CreateVoteResponse extends APIResponse {
  code: number
  msg: string
}

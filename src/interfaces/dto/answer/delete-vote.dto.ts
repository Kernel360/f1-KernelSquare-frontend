import { APIResponse } from "../api-response"

export interface DeleteVoteRequest {
  answerId: number
}

export interface DeleteVoteResponse extends APIResponse {}

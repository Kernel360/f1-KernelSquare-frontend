import { APIResponse } from "../api-response"

export interface DeleteAnswerRequest {
  answerId: number
}

export interface DeleteAnswerResponse extends APIResponse {}

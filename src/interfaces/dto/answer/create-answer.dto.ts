import { APIResponse } from "../api-response"

export interface CreateAnswerRequest {
  member_id: number
  content: string
  image_url?: string
}

export interface CreateAnswerResponse extends APIResponse {
  code: number
  msg: string
}

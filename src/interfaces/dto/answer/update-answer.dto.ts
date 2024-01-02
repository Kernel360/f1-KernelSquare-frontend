import { APIResponse } from "../api-response"

export interface UpdateAnswerRequest {
  content: string
  image_url?: string
}

export interface UpdateAnswerResponse extends APIResponse {
  code: number
  msg: string
}

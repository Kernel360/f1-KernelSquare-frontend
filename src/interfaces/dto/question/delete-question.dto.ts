import { APIResponse } from "../api-response"

export interface DeleteQuestionRequest {
  questionId: number
}

export interface DeleteQuestionResponse extends APIResponse {}

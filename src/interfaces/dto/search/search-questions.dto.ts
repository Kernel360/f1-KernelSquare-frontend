import { Question } from "@/interfaces/question"
import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface GetSearchQuestionRequest extends PaginationParams {
  keyword: string
}

export interface SearchQuestionPayload {
  question_list: Array<Question>
  total_count: number
}

export interface GetSearchQuestionResponse
  extends APIPagenationResponse<SearchQuestionPayload> {}

import { Question } from "@/interfaces/question"
import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface GetSearchQuestionRequest extends PaginationParams {
  keyword: string
}

export interface SearchQuestionPayload {
  list: Array<Question>
}

export interface GetSearchQuestionResponse
  extends APIPagenationResponse<SearchQuestionPayload> {}

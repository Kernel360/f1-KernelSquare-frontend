import { Question } from "@/interfaces/question"
import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface GetSearchQuestionResultRequest extends PaginationParams {
  keyword: string
}

export interface SearchQuestionResultPayload {
  list: Array<Question>
}

export interface GetSearchQuestionResultPayloadResponse
  extends APIPagenationResponse<SearchQuestionResultPayload> {}

import { Question } from "@/interfaces/question"
import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface GetQuestionListRequest extends PaginationParams {}

export interface QuestionListPayload {
  list: Array<Question & { member_id: number }>
}

export interface GetQuestionListResponse
  extends APIPagenationResponse<QuestionListPayload> {}

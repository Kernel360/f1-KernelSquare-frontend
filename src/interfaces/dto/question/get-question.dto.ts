import type { APIResponse } from "../api-response"
import type { Question } from "@/interfaces/question"

interface GetQuestionRequest {
  id: number
}

type QuestionPayload = Question

interface GetQuestionResponse extends APIResponse<QuestionPayload> {}

export type { GetQuestionRequest, GetQuestionResponse }

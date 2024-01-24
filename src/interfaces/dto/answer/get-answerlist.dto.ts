import type { Answer } from "@/interfaces/answer"
import type { APIResponse } from "../api-response"

interface GetAnswerRequest {
  questionId: number
}

type AnswerPayload = {
  answer_responses: Answer[]
}

interface GetAnswerResponse extends APIResponse<AnswerPayload> {}

export type { GetAnswerRequest, GetAnswerResponse }

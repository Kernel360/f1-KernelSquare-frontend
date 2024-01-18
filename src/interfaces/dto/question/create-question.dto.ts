import { TechTag } from "@/interfaces/tech-tag"
import { APIResponse } from "../api-response"

export interface CreateQuestionRequest {
  member_id: number
  title: string
  content: string
  image_url: string | null
  skills: Array<TechTag>
}

export interface CreateQuestionPayload {
  question_id: number
}

export interface CreateQuestionResponse
  extends APIResponse<CreateQuestionPayload> {}

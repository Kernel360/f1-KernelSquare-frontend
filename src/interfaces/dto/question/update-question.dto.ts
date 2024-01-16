import { TechTag } from "@/interfaces/tech-tag"
import { APIResponse } from "../api-response"

export interface UpdateQuestionRequest {
  questionId: number
  title: string
  content: string
  image_url: string | null
  skills: Array<TechTag>
}

export interface UpdateQuestionResponse extends APIResponse {}

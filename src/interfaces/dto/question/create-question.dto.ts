import { TechTag } from "@/interfaces/tech-tag"
import { APIResponse } from "../api-response"

export interface CreateQuestionRequest {
  member_id: number
  title: string
  content: string
  image_url: string
  skills: Array<TechTag>
}

export interface CreateQuestionResponse extends APIResponse<number> {}

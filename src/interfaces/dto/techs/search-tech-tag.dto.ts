import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface SearchTechTagRequest extends PaginationParams {
  keyword: string
}

export interface SearchTechTagPayload {
  total_count: number
  tech_stack_list: Array<string>
}

export interface SearchTechTagResponse
  extends APIPagenationResponse<SearchTechTagPayload> {}

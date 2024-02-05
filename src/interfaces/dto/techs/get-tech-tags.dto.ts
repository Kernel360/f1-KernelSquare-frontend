import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface GetTechTagsRequest extends PaginationParams {}

export interface GetTechTagsPayload {
  list: Array<string>
}

export interface GetTechTagsResponse
  extends APIPagenationResponse<GetTechTagsPayload> {}

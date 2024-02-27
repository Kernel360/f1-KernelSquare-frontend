import { BaseCodingMeeting } from "@/interfaces/coding-meetings"
import { APIPagenationResponse, PaginationParams } from "../api-response"

export type CodingMeetingListFilter = "all" | "open" | "closed"

export interface GetCodingMeetingListRequest extends PaginationParams {
  filter?: CodingMeetingListFilter
}

export interface CodingMeetingListPayload {
  list: Array<BaseCodingMeeting>
}

export interface GetCodingMeetingListResponse
  extends APIPagenationResponse<CodingMeetingListPayload> {}

import { BaseCodingMeeting } from "@/interfaces/coding-meetings"
import { APIPagenationResponse, PaginationParams } from "../api-response"

export interface GetCodingMeetingListRequest extends PaginationParams {}

export interface CodingMeetingListPayload {
  list: Array<BaseCodingMeeting>
}

export interface GetCodingMeetingListResponse
  extends APIPagenationResponse<CodingMeetingListPayload> {}

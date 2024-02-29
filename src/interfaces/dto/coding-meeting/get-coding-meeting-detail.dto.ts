import { CodingMeetingDetail } from "@/interfaces/coding-meetings"
import { APIResponse } from "../api-response"

export interface GetCodingMeetingDetailRequest {
  coding_meeting_token: string
}

export type GetCodingMeetingDetailPayload = Omit<
  CodingMeetingDetail,
  "created_date"
>

export interface GetCodingMeetingDetailResponse
  extends APIResponse<GetCodingMeetingDetailPayload> {}

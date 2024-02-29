import { CodingMeetingComment } from "@/interfaces/coding-meetings"
import { APIResponse } from "../../api-response"

export interface GetCodingMeetingCommentListRequest {
  coding_meeting_token: string
}

export type GetCodingMeetingCommentListPayload = Array<CodingMeetingComment>

export interface GetCodingMeetingCommentListResponse
  extends APIResponse<GetCodingMeetingCommentListPayload> {}

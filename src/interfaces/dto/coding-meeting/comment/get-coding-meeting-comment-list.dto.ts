import { CodingMeetingComment } from "@/interfaces/coding-meetings"
import { APIResponse } from "../../api-response"

export interface GetCodingMeetingCommentListRequest {
  coding_meeting_token: string
}

export interface GetCodingMeetingCommentListPayload {
  coding_meeting_comments: Array<CodingMeetingComment>
}

export interface GetCodingMeetingCommentListResponse
  extends APIResponse<GetCodingMeetingCommentListPayload> {}

import { CodingMeetingCommentContent } from "@/interfaces/coding-meetings"
import { APIResponse } from "../../api-response"

export interface DeleteCodingMeetingCommentRequest
  extends Pick<CodingMeetingCommentContent, "coding_meeting_comment_token"> {}

export interface DeleteCodingMeetingCommentResponse extends APIResponse {}

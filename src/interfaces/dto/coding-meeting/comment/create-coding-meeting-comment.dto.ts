import {
  CodingMeetingCommentAuthor,
  CodingMeetingCommentContent,
} from "@/interfaces/coding-meetings"
import { APIResponse } from "../../api-response"

interface BaseRequest
  extends Pick<CodingMeetingCommentContent, "coding_meeting_comment_content"> {
  coding_meeting_token: string
}

export interface CreateCodingMeetingCommentRequest extends BaseRequest {}

export interface CreateCodingMeetingCommentResponse extends APIResponse {}

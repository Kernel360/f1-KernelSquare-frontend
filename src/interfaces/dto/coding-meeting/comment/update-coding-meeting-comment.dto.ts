import { CodingMeetingCommentContent } from "@/interfaces/coding-meetings"
import { APIResponse } from "../../api-response"

export interface UpdateCodingMeetingCommentRequest
  extends CodingMeetingCommentContent {}

export interface UpdateCodingMeetingCommentResponse extends APIResponse {}

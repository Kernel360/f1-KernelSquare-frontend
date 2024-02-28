import {
  CodingMeetingCommentAuthor,
  CodingMeetingCommentContent,
} from "@/interfaces/coding-meetings"
import { APIResponse } from "../../api-response"

type BaseRequest = Pick<CodingMeetingCommentAuthor, "member_id"> &
  CodingMeetingCommentContent

export interface CreateCodingMeetingCommentRequest extends BaseRequest {}

export interface CreateCodingMeetingCommentResponse extends APIResponse {}

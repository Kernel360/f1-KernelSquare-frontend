import type {
  CodingMeetingAuthor,
  CodingMeetingDetail,
} from "@/interfaces/coding-meetings"
import type { APIResponse } from "../api-response"

type BaseRequest = Omit<
  CodingMeetingDetail,
  | keyof CodingMeetingAuthor
  | "created_date"
  | "coding_meeting_token"
  | "coding_meeting_closed"
>

export interface UpdateCodingMeetingRequest extends BaseRequest {}

export interface UpdateCodingMeetingResponse extends APIResponse {}

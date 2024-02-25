import { APIResponse } from "../api-response"

export interface DeleteCodingMeetingRequest {
  coding_meeting_token: string
}

export interface DeleteCodingMeetingResponse extends APIResponse {}

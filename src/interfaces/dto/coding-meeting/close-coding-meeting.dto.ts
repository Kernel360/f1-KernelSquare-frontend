import { APIResponse } from "../api-response"

export interface CloseCodingMeetingRequest {
  coding_meeting_token: string
}

export interface CloseCodingMeetingResponse extends APIResponse {}

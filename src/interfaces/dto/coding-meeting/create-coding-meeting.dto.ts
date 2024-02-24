import { CodingMeetingHashTags } from "@/interfaces/coding-meetings"
import { APIResponse } from "../api-response"

export interface CreateCodingMeetingRequest {
  member_id: number
  coding_meeting_title: string
  coding_meeting_location_id: string
  coding_meeting_location_place_name: string
  coding_meeting_location_longitude: string
  coding_meeting_location_latitude: string
  coding_meeting_member_lower_limit: number
  coding_meeting_member_upper_limit: number
  coding_meeting_start_time: string
  coding_meeting_end_time: string
  coding_meeting_content: string
  coding_meeting_hashtags: CodingMeetingHashTags
}

export interface CreateCodingMeetingPayload {
  coding_meeting_token: string
}

export interface CreateCodingMeetingResponse
  extends APIResponse<CreateCodingMeetingPayload> {}

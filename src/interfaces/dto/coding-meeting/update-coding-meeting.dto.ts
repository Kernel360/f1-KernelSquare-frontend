import { CodingMeetingHashTags } from "@/interfaces/coding-meetings"
import { APIResponse } from "../api-response"

export interface UpdateCodingMeetingRequest {
  coding_meeting_token: string
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

export interface UpdateCodingMeetingResponse extends APIResponse {}

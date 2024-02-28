export interface CodingMeetingAuthor {
  member_id: number
  member_level: number
  member_nickname: string
  member_profile_url: string | null
  member_level_image_url: string
}

export type CodingMeetingHashTag = string

export type CodingMeetingHashTags = Array<CodingMeetingHashTag>

export interface CodingMeetingInfo {
  coding_meeting_token: string
  coding_meeting_title: string
  coding_meeting_start_time: string
  coding_meeting_end_time: string
  coding_meeting_hashtags: CodingMeetingHashTags
  coding_meeting_closed: boolean
  coding_meeting_content: string
}

export type BaseCodingMeeting = CodingMeetingAuthor &
  CodingMeetingInfo & {
    created_date: string
  }

export interface CodingMeetingLocation {
  coding_meeting_location_id: string
  coding_meeting_location_place_name: string
  coding_meeting_location_longitude: string
  coding_meeting_location_latitude: string
}

export interface CodingMeetingMemberRange {
  coding_meeting_member_upper_limit: number
}

// detail
export type CodingMeetingDetail = BaseCodingMeeting &
  CodingMeetingLocation &
  CodingMeetingMemberRange

// mock db type
export type MockCodingMeeting = CodingMeetingDetail

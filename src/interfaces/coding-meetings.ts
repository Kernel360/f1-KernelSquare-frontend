export interface CodingMeetingAuthor {
  member_id: number
  member_level: number
  member_nickname: string
  member_profile_url: string | null
  member_level_image_url: string
}

export interface CodingMeetingInfo {
  coding_meeting_token: string
  coding_meeting_title: string
  coding_meeting_start_time: string
  coding_meeting_end_time: string
}

export type CodingMeetingHashTag = string

export type CodingMeetingHashTags = Array<CodingMeetingHashTag>

export type BaseCodingMeeting = CodingMeetingAuthor &
  CodingMeetingInfo & {
    coding_meeting_hashtags: CodingMeetingHashTags
    coding_meeting_closed: boolean
  } & {
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
  CodingMeetingMemberRange & {
    coding_meeting_content: string
  }

// mock db type
export type MockCodingMeeting = CodingMeetingDetail & {
  comments: Array<CodingMeetingComment>
}

// comment
export type CodingMeetingCommentAuthor = CodingMeetingAuthor
export type CodingMeetingCommentContent = {
  coding_meeting_comment_token: string
  coding_meeting_comment_content: string
}
export type CodingMeetingComment = CodingMeetingCommentAuthor &
  CodingMeetingCommentContent & {
    created_date: string
  }

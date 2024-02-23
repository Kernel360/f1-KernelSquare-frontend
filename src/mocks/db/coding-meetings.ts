import { MockCodingMeeting } from "@/interfaces/coding-meetings"
import { mockUsers } from "./user"
import badge_url from "@/assets/images/badges"

/*
  [
    {
      member_id: mockUsers[0].id,
      member_level: mockUsers[0].level,
      member_nickname: mockUsers[0].nickname,
      member_profile_url: mockUsers[0].image_url,
      member_level_image_url: badge_url[mockUsers[0].level],
      created_date: '2024-02-23T04:36:53.696Z',
      coding_meeting_token: 'CMT00000000',
      coding_meeting_title: '모각코 모집1',
      coding_meeting_start_time: '2024-02-23T07:36:53.696Z',
      coding_meeting_end_time: '2024-02-23T09:36:53.696Z',
      coding_meeting_member_lower_limit: 2,
      coding_meeting_member_upper_limit: 4,
      coding_meeting_hashtags: ['모각코', '맥북', '필수'],
      coding_meeting_location_id: 123,
      coding_meeting_location_place_name: '',
      coding_meeting_location_latitude: '123',
      coding_meeting_location_longitude: '123'
    }
  ]
*/
const mockCodingMeetings: MockCodingMeeting[] = []

export default mockCodingMeetings

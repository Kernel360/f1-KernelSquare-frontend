import { MockCodingMeeting } from "@/interfaces/coding-meetings"
import { mockUsers } from "./user"
import badge_url from "@/assets/images/badges"

const mockCodingMeetings: MockCodingMeeting[] = [
  {
    member_id: mockUsers[0].id,
    member_level: mockUsers[0].level,
    member_nickname: mockUsers[0].nickname,
    member_profile_url: mockUsers[0].image_url,
    member_level_image_url: badge_url[mockUsers[0].level],
    created_date: "2024-02-23T04:30:00.696Z",
    coding_meeting_closed: false,
    coding_meeting_token: "CMT00000000",
    coding_meeting_title: "봉은사역에서 모각코할 분들 모집합니다.",
    coding_meeting_start_time: "2024-02-29T07:30:53.696Z",
    coding_meeting_end_time: "2024-02-29T09:00:53.696Z",
    coding_meeting_member_upper_limit: 4,
    coding_meeting_hashtags: ["모각코", "맥북", "필수"],
    coding_meeting_location_id: "123",
    coding_meeting_location_place_name: "스타벅스 봉은사역점",
    coding_meeting_location_latitude: "37.5149243",
    coding_meeting_location_longitude: "127.0631257",
    coding_meeting_content:
      "안녕하세요<br/>저는 아직 6개월 밖에 되지 않은 웹 개발자 입니다.<br/>주말동안 아무것도 안하게 되니 서로 정보공유 하며 공부할겸 의정부에서 모각코를 해볼까 합니다.<br/>관심있는 분들은 간단한 자기 소개 및 참여 의사 댓글에 남겨주시면 감사하겠습니다!!..🫡",
  },
  {
    member_id: mockUsers[1].id,
    member_level: mockUsers[1].level,
    member_nickname: mockUsers[1].nickname,
    member_profile_url: mockUsers[1].image_url,
    member_level_image_url: badge_url[mockUsers[1].level],
    created_date: "2024-02-22T05:28:00.696Z",
    coding_meeting_closed: true,
    coding_meeting_token: "CMT00000001",
    coding_meeting_title:
      "[신림] 정기 오프라인 모각코 스터디 (주2회 이상 참여 必)",
    coding_meeting_start_time: "2024-02-29T15:30:00.696Z",
    coding_meeting_end_time: "2024-02-29T20:00:00.696Z",
    coding_meeting_member_upper_limit: 6,
    coding_meeting_hashtags: ["신림", "스터디", "오프라인"],
    coding_meeting_location_id: "124",
    coding_meeting_location_place_name: "투썸플레이스 신림역점",
    coding_meeting_location_latitude: "37.4854918",
    coding_meeting_location_longitude: "126.9297962",
    coding_meeting_content:
      "신림역 주변 카페에서 같이 모여서<br/>개발 관련 공부하실 분들 모집합니다!!<br/>아무래도 혼자 하다보면 딴 짓🤦하게 되거나 깊게 집중이 잘 안되니<br/>서로 촉매제가 되었으면 좋겠습니다!!<br/>와서 공부할 의지 있는 분만💻",
  },
  {
    member_id: mockUsers[2].id,
    member_level: mockUsers[2].level,
    member_nickname: mockUsers[2].nickname,
    member_profile_url: mockUsers[2].image_url,
    member_level_image_url: badge_url[mockUsers[2].level],
    created_date: "2024-02-23T04:36:53.696Z",
    coding_meeting_closed: false,
    coding_meeting_token: "CMT00000002",
    coding_meeting_title:
      "[사당역] Next.js 스터디 같이 하실 초보분들 모십니다.",
    coding_meeting_start_time: "2024-03-01T08:00:53.696Z",
    coding_meeting_end_time: "2024-03-01T09:00:53.696Z",
    coding_meeting_member_upper_limit: 4,
    coding_meeting_hashtags: [
      "프론트엔드",
      "Next.js",
      "포트폴리오",
      "프로젝트",
    ],
    coding_meeting_location_id: "125",
    coding_meeting_location_place_name: "탐앤탐스 사당역점",
    coding_meeting_location_latitude: "37.4767403",
    coding_meeting_location_longitude: "126.9833049",
    coding_meeting_content:
      "Next.js 학습 후 포트폴리오용/스킬업을 위한 나만의 프로젝트를 완성하는 오프라인 스터디원을 모집합니다.<br/>이번 모임을 통해 앞으로 포폴/스킬업을 위해 Next.js로 만들 프로젝트에 대한 계획을 발표하고 이후 추가 일정을 잡아 코드 리뷰 및 vercel 등에 배포 후 서로 피드백을 주는 시간을 가지면 좋을 것 같습니다. <br/>예상 스터디 일정(횟수) : 최소 5회 + α<br/> 아래 채팅방 들어오셔서 간단한 자기소개 부탁드립니다 <br/>'카카오톡 오픈채팅방 링크' <br/> ",
  },
]

export default mockCodingMeetings
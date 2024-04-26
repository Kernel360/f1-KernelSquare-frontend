import { ApiStatus } from "@/constants/response/api"
import {
  CreateCodingMeetingRequest,
  CreateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, PathParams, http } from "msw"
import jwt, { JwtPayload } from "jsonwebtoken"
import { mockUsers } from "@/mocks/db/user"
import { HttpStatusCode } from "axios"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { MockCodingMeeting } from "@/interfaces/coding-meetings"
import badge_url from "@/assets/images/badges"
import dayjs from "dayjs"

export const mockCreateCodingMeetingApi = http.post<
  PathParams,
  CreateCodingMeetingRequest,
  CreateCodingMeetingResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.codingMeeting.createCodingMeeting}`,
  async ({ request }) => {
    const { ...createPayload } = await request.json()

    const header = request.headers
    const header_token = header.get("Authorization")

    if (!header_token) {
      const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.Unauthorized
      return HttpResponse.json(
        {
          code: Code,
          msg: "인증된 유저가 아닙니다",
        },
        { status: HttpStatus },
      )
    }

    const decoded_token = jwt.decode(header_token) as JwtPayload & {
      id: number
    }

    const targetMember = mockUsers.find((user) => user.id === decoded_token.id)

    if (!targetMember) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "답변을 입력할 권한이 없습니다.",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      )
    }

    const token = "CMT" + (mockCodingMeetings.length + 10000)

    const newCodingMeetingPost: MockCodingMeeting = {
      member_id: targetMember.id,
      member_level: targetMember.level,
      member_nickname: targetMember.nickname,
      member_profile_url: targetMember.image_url,
      member_level_image_url: badge_url[targetMember.level],
      created_date: dayjs().format(),
      coding_meeting_token: token,
      ...createPayload,
      coding_meeting_closed: false,
      comments: [],
    }

    mockCodingMeetings.push(newCodingMeetingPost)

    return HttpResponse.json(
      {
        code: 5144,
        msg: "모각코 생성 성공",
        data: { coding_meeting_token: token },
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  },
)

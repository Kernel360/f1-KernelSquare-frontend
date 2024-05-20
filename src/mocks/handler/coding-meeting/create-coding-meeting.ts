import { ApiStatus } from "@/constants/response/api"
import {
  CreateCodingMeetingRequest,
  CreateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, PathParams, http } from "msw"
import jwt, { JwtPayload } from "jsonwebtoken"
import { mockUsers } from "@/mocks/db/user"
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
    const authHeader = header.get("Authorization")

    if (!authHeader) {
      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.createCodingMeeting.Unauthorized
      return HttpResponse.json(
        {
          code: Code,
          msg: "인증된 유저가 아닙니다",
        },
        { status: HttpStatus },
      )
    }

    const accessToken = authHeader.replace(/^Bearer /, "")

    const decoded_token = jwt.decode(accessToken) as JwtPayload & {
      id: number
    }

    const targetMember = mockUsers.find((user) => user.id === decoded_token.id)

    if (!targetMember) {
      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.createCodingMeeting.NotFound

      return HttpResponse.json(
        {
          code: Code,
          msg: "유저를 찾을 수 없습니다.",
        },
        {
          status: HttpStatus,
        },
      )
    }

    const token = "cm_" + (mockCodingMeetings.length + 10000)

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

    const { Code, HttpStatus } = ApiStatus.CodingMeetings.createCodingMeeting.Ok

    return HttpResponse.json(
      {
        code: Code,
        msg: "모각코 생성 성공",
        data: { coding_meeting_token: token },
      },
      {
        status: HttpStatus,
      },
    )
  },
)

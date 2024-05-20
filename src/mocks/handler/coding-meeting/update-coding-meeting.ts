import { ApiStatus } from "@/constants/response/api"
import {
  UpdateCodingMeetingRequest,
  UpdateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, http } from "msw"
import jwt, { JwtPayload } from "jsonwebtoken"

export const mockUpdateCodingMeetingApi = http.put<
  { coding_meeting_token: string },
  UpdateCodingMeetingRequest,
  UpdateCodingMeetingResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.codingMeeting.updateCodingMeeting()}`,
  async ({ params, request }) => {
    try {
      const header = request.headers
      const authHeader = header.get("Authorization")

      if (!authHeader) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.updateCodingMeeting.Unauthorized
        return HttpResponse.json(
          {
            code: Code,
            msg: "인증된 유저가 아닙니다",
          },
          { status: HttpStatus },
        )
      }

      const accessToken = authHeader.replace(/^Bearer /g, "")
      const decoded_token = jwt.decode(accessToken) as JwtPayload & {
        id: number
      }

      const targetCodingMeetingToken = params.coding_meeting_token

      const targetMockCodingMeetingIdx = mockCodingMeetings.findIndex(
        (post) => post.coding_meeting_token === targetCodingMeetingToken,
      )

      if (targetMockCodingMeetingIdx < 0) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.updateCodingMeeting.NotFound

        return HttpResponse.json(
          {
            code: Code,
            msg: "존재하지 않는 모각코",
          },
          { status: HttpStatus },
        )
      }

      const targetMockCodingMeeting =
        mockCodingMeetings[targetMockCodingMeetingIdx]

      if (targetMockCodingMeeting.member_id !== decoded_token.id) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.updateCodingMeeting.Forbidden

        return HttpResponse.json(
          { code: Code, msg: "해당 모각코를 수정할 권한이 없는 유저입니다" },
          { status: HttpStatus },
        )
      }

      const updatePayload = await request.json()

      mockCodingMeetings[targetMockCodingMeetingIdx] = {
        ...mockCodingMeetings[targetMockCodingMeetingIdx],
        ...updatePayload,
      }

      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.updateCodingMeeting.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "모각코 수정 성공",
        },
        { status: HttpStatus },
      )
    } catch (error) {
      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.updateCodingMeeting.InternalServerError

      return HttpResponse.json(
        {
          code: Code,
          msg: "서버 오류",
        },
        { status: HttpStatus },
      )
    }
  },
)

import { ApiStatus } from "@/constants/response/api"
import {
  UpdateCodingMeetingRequest,
  UpdateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, http } from "msw"

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
      const token = header.get("Authorization")

      if (!token) {
        const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.Unauthorized
        return HttpResponse.json(
          {
            code: Code,
            msg: "인증된 유저가 아닙니다",
          },
          { status: HttpStatus },
        )
      }

      const targetToken = params.coding_meeting_token

      const updatePayload = await request.json()

      const targetMockIdx = mockCodingMeetings.findIndex(
        (post) => post.coding_meeting_token === targetToken,
      )

      if (targetMockIdx < 0) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.updateCodingMeeting.NotFound

        return HttpResponse.json(
          {
            code: Code,
            msg: "존재하지 않는 질문",
          },
          { status: HttpStatus },
        )
      }

      mockCodingMeetings[targetMockIdx] = {
        ...mockCodingMeetings[targetMockIdx],
        ...updatePayload,
      }

      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.updateCodingMeeting.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "질문 수정 성공",
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

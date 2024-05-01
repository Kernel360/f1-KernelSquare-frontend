import { DeleteCodingMeetingResponse } from "@/interfaces/dto/coding-meeting/delete-coding-meeting.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockDeleteCodingMeetingApi = http.delete<
  { coding_meeting_token: string },
  DefaultBodyType,
  DeleteCodingMeetingResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.codingMeeting.deleteCodingMeeting()}`,
  async ({ request, params }) => {
    const header = request.headers
    const token = header.get("Authorization")

    if (!token) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "로그인 필요",
        },
        { status: HttpStatusCode.Unauthorized },
      )
    }

    const targetPost = mockCodingMeetings.findIndex(
      (post) => post.coding_meeting_token === params.coding_meeting_token,
    )

    mockCodingMeetings.splice(targetPost, 1)

    return HttpResponse.json(
      {
        code: 5144,
        msg: "모각코 삭제 성공",
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  },
)

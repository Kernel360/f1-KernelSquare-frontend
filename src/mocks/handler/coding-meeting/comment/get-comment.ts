import { ApiStatus } from "@/constants/response/api"
import { GetCodingMeetingCommentListResponse } from "@/interfaces/dto/coding-meeting/comment/get-coding-meeting-comment-list.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockGetCodingMeetingCommentApi = http.get<
  { coding_meeting_token: string },
  DefaultBodyType,
  GetCodingMeetingCommentListResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.codingMeeting.getCodingMeetingCommentList()}`,
  async ({ params }) => {
    // 댓글 조회
    const codingMeetingToken = params.coding_meeting_token

    const targetCodingMeeting = mockCodingMeetings.find(
      (codingMeeting) =>
        codingMeeting.coding_meeting_token === codingMeetingToken,
    )

    if (!targetCodingMeeting) {
      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.getCodingMeetingComments.NotFound

      return HttpResponse.json(
        {
          code: Code,
          msg: "모각코 댓글을 찾을 수 없습니다",
        },
        { status: HttpStatus },
      )
    }

    const { Code, HttpStatus } =
      ApiStatus.CodingMeetings.getCodingMeetingComments.Ok

    return HttpResponse.json(
      {
        code: Code,
        msg: "모각코 댓글 조회 성공",
        data: [...targetCodingMeeting.comments],
      },
      { status: HttpStatus },
    )
  },
)

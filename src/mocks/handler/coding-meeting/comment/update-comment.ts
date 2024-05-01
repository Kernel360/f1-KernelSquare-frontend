import {
  UpdateCodingMeetingCommentRequest,
  UpdateCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/update-coding-meeting-comment.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockUpdateCodingMeetingCommentApi = http.put<
  { coding_meeting_comment_token: string },
  Pick<UpdateCodingMeetingCommentRequest, "coding_meeting_comment_content">,
  UpdateCodingMeetingCommentResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.codingMeeting.updateCodingMeetingComment()}`,
  async ({ request, params }) => {
    // 댓글 업데이트
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

    const { coding_meeting_comment_content } = await request.json()
    const codingMeetingCommentToken = params.coding_meeting_comment_token

    let targetCommentIndex = -1

    const targetCodingMeeting = mockCodingMeetings.find((codingMeeting) => {
      const { comments } = codingMeeting

      const commentIndex = comments.findIndex(
        (comment) =>
          comment.coding_meeting_comment_token === codingMeetingCommentToken,
      )

      if (commentIndex > -1) {
        targetCommentIndex = commentIndex
      }

      return commentIndex > -1
    })

    if (targetCommentIndex > -1) {
      targetCodingMeeting!.comments[
        targetCommentIndex
      ].coding_meeting_comment_content = coding_meeting_comment_content

      return HttpResponse.json(
        {
          code: -1,
          msg: "모각코 댓글 수정 성공",
        },
        { status: HttpStatusCode.Ok },
      )
    }

    return HttpResponse.json(
      {
        code: -1,
        msg: "모각코 댓글을 찾을 수 없습니다",
      },
      { status: HttpStatusCode.NotFound },
    )
  },
)

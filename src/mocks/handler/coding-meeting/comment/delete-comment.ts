import { DeleteCodingMeetingCommentResponse } from "@/interfaces/dto/coding-meeting/comment/delete-coding-meeting-comment.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockDeleteCodingMeetingCommentApi = http.delete<
  { coding_meeting_comment_token: string },
  DefaultBodyType,
  DeleteCodingMeetingCommentResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.codingMeeting.deleteCodingMeetingComment()}`,
  async ({ request, params }) => {
    // 댓글 삭제
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
      targetCodingMeeting!.comments.splice(targetCommentIndex, 1)

      return HttpResponse.json(
        {
          code: -1,
          msg: "모각코 댓글 삭제 성공",
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

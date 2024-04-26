import {
  CreateCodingMeetingCommentRequest,
  CreateCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/create-coding-meeting-comment.dto"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, PathParams, http } from "msw"
import jwt, { JwtPayload } from "jsonwebtoken"
import { mockUsers } from "@/mocks/db/user"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import badge_url from "@/assets/images/badges"

export const mockCreateCodingMeetingCommentApi = http.post<
  PathParams,
  CreateCodingMeetingCommentRequest,
  CreateCodingMeetingCommentResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.codingMeeting.createCodingMeetingComment}`,
  async ({ request }) => {
    const header = request.headers
    const token = header.get("Authorization")

    const { coding_meeting_comment_content, coding_meeting_token } =
      await request.json()

    if (!token) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "로그인이 필요합니다",
        },
        { status: HttpStatusCode.Unauthorized },
      )
    }

    const { id } = jwt.decode(token.replace("Bearer ", "")) as JwtPayload & {
      id: number
    }
    const targetUser = mockUsers.find((user) => user.id === id)

    const targetCodingMeeting = mockCodingMeetings.find(
      (codingMeeting) =>
        codingMeeting.coding_meeting_token === coding_meeting_token,
    )

    if (targetCodingMeeting) {
      targetCodingMeeting.comments.push({
        member_id: targetUser!.id,
        member_nickname: targetUser!.nickname,
        member_level: targetUser!.level,
        member_level_image_url: badge_url[targetUser!.level],
        member_profile_url: targetUser!.image_url,
        coding_meeting_comment_token: `CT-${
          10000 + targetCodingMeeting.comments.length
        }`,
        coding_meeting_comment_content,
        created_date: new Date().toISOString(),
      })

      return HttpResponse.json(
        {
          code: -1,
          msg: "댓글 생성 성공",
        },
        { status: HttpStatusCode.Ok },
      )
    }

    return HttpResponse.json(
      {
        code: -1,
        msg: "해당 모각코를 찾을 수 없습니다",
      },
      { status: HttpStatusCode.NotFound },
    )
  },
)

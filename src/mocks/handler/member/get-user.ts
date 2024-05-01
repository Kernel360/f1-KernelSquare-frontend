import { ApiStatus } from "@/constants/response/api"
import {
  GetMemberResponse,
  UserPayload,
} from "@/interfaces/dto/member/get-member.dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockGetUserApi = http.get<
  { id: string },
  DefaultBodyType,
  GetMemberResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.member.getMember()}`,
  ({ request, params }) => {
    try {
      const auth = request.headers.get("Authorization")

      if (!auth) {
        const { Code, HttpStatus } = ApiStatus.Member.getMember.Unauthorized

        return HttpResponse.json(
          {
            code: Code,
            msg: "인증되지 않은 회원입니다.",
          },
          {
            status: HttpStatus,
          },
        )
      }

      const memberId = params.id

      const existMockUser = mockUsers.find(
        (user) => user.id === Number(memberId),
      )

      if (!existMockUser) {
        const { Code, HttpStatus } = ApiStatus.Member.getMember.NotFound

        return HttpResponse.json(
          {
            code: Code,
            msg: "존재하지 않는 회원입니다.",
          },
          { status: HttpStatus },
        )
      }

      const { Code, HttpStatus } = ApiStatus.Member.getMember.Ok

      const userPayload: UserPayload = {
        member_id: existMockUser.id,
        nickname: existMockUser.nickname,
        level: existMockUser.level,
        experience: existMockUser.experience,
        introduction: existMockUser.introduction ?? "",
        image_url: existMockUser.image_url ?? "",
      }

      return HttpResponse.json(
        {
          code: Code,
          msg: "회원 정보 조회 성공",
          data: {
            ...userPayload,
          },
        },
        { status: HttpStatus },
      )
    } catch (error) {
      const { Code, HttpStatus } =
        ApiStatus.Member.getMember.InternalServerError

      return HttpResponse.json(
        {
          code: Code,
          msg: "서버 오류",
        },
        {
          status: HttpStatus,
        },
      )
    }
  },
)

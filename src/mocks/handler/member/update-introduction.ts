import { ApiStatus } from "@/constants/response/api"
import {
  UpdateMemberIntroductionRequest,
  UpdateMemberIntroductionResponse,
} from "@/interfaces/dto/member/update-member-introduction.dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, http } from "msw"

export const mockUpdateUserIntroductionApi = http.put<
  { id: string },
  Omit<UpdateMemberIntroductionRequest, "memberId">,
  UpdateMemberIntroductionResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.member.updateMemberIntroduction()}`,
  async ({ request, params }) => {
    // 정보 수정
    const userId = params.id
    const { introduction } = await request.json()

    const target = mockUsers.find((user) => user.id === Number(userId))!
    target.introduction = introduction

    const { Code, HttpStatus } = ApiStatus.Member.updateMember.Ok

    return HttpResponse.json(
      {
        code: Code,
        msg: "회원 정보 수정 성공",
      },
      { status: HttpStatus },
    )
  },
)

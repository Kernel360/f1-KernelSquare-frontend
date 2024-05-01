import { ApiStatus } from "@/constants/response/api"
import {
  UpdateMemberProfileImageRequest,
  UpdateMemberProfileImageResponse,
} from "@/interfaces/dto/member/update-member-profile-image-dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, http } from "msw"

export const mockUpdateProfileImageApi = http.put<
  { id: string },
  Omit<UpdateMemberProfileImageRequest, "memberId">,
  UpdateMemberProfileImageResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.member.updateMemberProfileImage()}`,
  async ({ request, params }) => {
    const userId = params.id
    const { image_url } = await request.json()

    const target = mockUsers.find((user) => user.id === Number(userId))!

    if (typeof image_url !== "undefined") target.image_url = image_url

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

import {
  UpdateMemberNicknameRequest,
  UpdateMemberNicknameResponse,
} from "@/interfaces/dto/member/update-member-nickname.dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { validatorInstance } from "@/util/validate"
import { HttpStatusCode } from "axios"
import { HttpResponse, PathParams, http } from "msw"

export const mockUpdateNicknameApi = http.put<
  PathParams,
  UpdateMemberNicknameRequest,
  UpdateMemberNicknameResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.member.updateMemberNickname}`,
  async ({ request }) => {
    const header = request.headers
    const header_token = header.get("Authorization")

    const { member_id, nickname } = await request.json()

    if (!header_token) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "로그인 후 닉네임 수정이 가능합니다.",
        },
        { status: HttpStatusCode.Unauthorized },
      )
    }

    const targetUser = mockUsers.find((mockUser) => mockUser.id === member_id)

    if (!targetUser) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "유저를 찾을 수 없습니다",
        },
        { status: HttpStatusCode.NotFound },
      )
    }

    if (!validatorInstance.validateNickname(nickname).allCheck()) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "유효한 닉네임이 아닙니다",
        },
        { status: HttpStatusCode.BadRequest },
      )
    }

    targetUser.nickname = nickname

    return HttpResponse.json(
      {
        code: 1246,
        msg: "회원 닉네임이 수정되었습니다.",
        data: {
          member_id: targetUser.id,
          nickname: targetUser.nickname,
          experience: targetUser.experience,
          introduction: targetUser.introduction,
          image_url: targetUser.image_url,
          level: targetUser.level,
        },
      },
      { status: HttpStatusCode.Ok },
    )
  },
)

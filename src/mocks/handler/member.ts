import { GetMemberResponse } from "@/interfaces/dto/member/get-member.dto"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"
import { mockUsers } from "../db/user"
import { HttpStatusCode } from "axios"
import {
  UpdateMemberInfoRequest,
  UpdateMemberInfoResponse,
} from "@/interfaces/dto/member/update-member-info.dto"

export const memberHandler = [
  http.get<{ id: string }, DefaultBodyType, GetMemberResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.member.getMember()}`,
    ({ params }) => {
      // 특정 멤버 조회
      const memberId = params.id

      const existMockUser = mockUsers.find(
        (user) => user.id === Number(memberId),
      )

      if (!existMockUser)
        return HttpResponse.json(
          {
            code: HttpStatusCode.InternalServerError,
            msg: "유저를 찾을 수 없습니다",
          },
          { status: HttpStatusCode.InternalServerError },
        )

      const { password, ...user } = existMockUser

      return HttpResponse.json(
        {
          code: HttpStatusCode.Ok,
          msg: "",
          data: {
            ...user,
          },
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
  http.put<
    { id: string },
    Omit<UpdateMemberInfoRequest, "id">,
    UpdateMemberInfoResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.member.updateMemberInfo()}`,
    async ({ request, params }) => {
      // 정보 수정
      const userId = params.id
      const { nickname, introduction, image_url } = await request.json()

      const target = mockUsers.find((user) => user.id === Number(userId))!

      target.introduction = introduction

      return HttpResponse.json(
        {
          code: 1242,
          msg: "회원 정보 수정 완료",
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
]

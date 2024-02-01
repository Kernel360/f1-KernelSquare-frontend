import {
  GetMemberResponse,
  UserPayload,
} from "@/interfaces/dto/member/get-member.dto"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"
import { mockUsers } from "../db/user"
import { ApiStatus } from "@/constants/response/api"
import type {
  UpdateMemberIntroductionRequest,
  UpdateMemberIntroductionResponse,
} from "@/interfaces/dto/member/update-member-introduction.dto"
import type {
  UpdateMemberProfileImageRequest,
  UpdateMemberProfileImageResponse,
} from "@/interfaces/dto/member/update-member-profile-image-dto"

export const memberHandler = [
  http.get<{ id: string }, DefaultBodyType, GetMemberResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.member.getMember()}`,
    ({ request, params }) => {
      // 특정 멤버 조회
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
          id: existMockUser.id,
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
  ),
  // 회원 자기소개 수정
  http.put<
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
  ),
  // 회원 프로필 이미지 수정
  http.put<
    { id: string },
    Omit<UpdateMemberProfileImageRequest, "memberId">,
    UpdateMemberProfileImageResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.member.updateMemberProfileImage()}`,
    async ({ request, params }) => {
      // 정보 수정
      const userId = params.id
      const { image_url } = await request.json()

      const target = mockUsers.find((user) => user.id === Number(userId))!
      console.log("프로필 이미지 수정", target)

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
  ),
]

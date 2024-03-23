import {
  GetMemberResponse,
  UserPayload,
} from "@/interfaces/dto/member/get-member.dto"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
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
import {
  UpdateMemberNicknameRequest,
  UpdateMemberNicknameResponse,
} from "@/interfaces/dto/member/update-member-nickname.dto"
import { HttpStatusCode } from "axios"
import { Validator } from "@/util/validate"

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
  ),
  // 회원 닉네임 수정
  http.put<
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

      const validator = new Validator()

      if (!validator.validateNickname(nickname).allCheck()) {
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
  ),
]

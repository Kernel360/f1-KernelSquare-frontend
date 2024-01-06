import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} from "@/constants/token"
import {
  DuplicateCheckEmailRequest,
  DuplicateCheckEmailResponse,
} from "@/interfaces/dto/auth/duplicate-check-email.dto"
import {
  DuplicateCheckNickNameRequest,
  DuplicateCheckNickNameResponse,
} from "@/interfaces/dto/auth/duplicate-check-nickname.dto"
import { LoginRequest, LoginResponse } from "@/interfaces/dto/auth/login.dto"
import { SignupRequest, SignupResponse } from "@/interfaces/dto/auth/signup.dto"
import { RouteMap } from "@/service/route-map"
import { Validator } from "@/util/validate"
import { HttpStatusCode } from "axios"
import { http, HttpResponse, PathParams } from "msw"
import { mockUsers } from "../db/user"
import { jwtSign } from "@/util/actions/jwt"
import { LogoutRequest, LogoutResponse } from "@/interfaces/dto/auth/logout.dto"
import { ACCOUNT_STATUS } from "@/interfaces/user"

const validator = new Validator()

export const authHandler = [
  http.post<PathParams, LoginRequest, LoginResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.login}`,
    async ({ request }) => {
      // 로그인
      const { email, password } = await request.json()

      const invalidFields = []

      if (!validator.validateEmail(email).allCheck()) {
        invalidFields.push("email")
      }
      if (!validator.validatePassword(password).allCheck()) {
        invalidFields.push("password")
      }

      if (invalidFields.length) {
        return HttpResponse.json(
          {
            code: HttpStatusCode.BadRequest,
            msg: "잘못된 요청입니다",
          },
          { status: HttpStatusCode.BadRequest },
        )
      }

      const existMockUser = mockUsers.find((user) => user.email === email)
      const equalPassword = existMockUser
        ? existMockUser.password === password
        : false

      if (!existMockUser) {
        return HttpResponse.json(
          {
            code: 1100,
            msg: "계정 정보가 일치하지 않습니다.",
          },
          {
            status: HttpStatusCode.NotFound,
          },
        )
      }

      if (!equalPassword) {
        return HttpResponse.json(
          {
            code: 1101,
            msg: "비밀번호가 일치하지 않습니다.",
          },
          {
            status: HttpStatusCode.NotFound,
          },
        )
      }

      const {
        id: member_id,
        nickname,
        experience,
        introduction,
        image_url,
        level,
        authorities: roles,
      } = existMockUser

      const [access_token, refresh_token] = await Promise.all([
        jwtSign(
          {
            id: existMockUser.id,
          },
          JWT_ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          },
        ),
        jwtSign(
          {
            id: existMockUser.id,
          },
          JWT_REFRESH_TOKEN_SECRET,
          { expiresIn: "14d" },
        ),
      ])

      return HttpResponse.json(
        {
          code: 1140,
          msg: "로그인 성공",
          data: {
            member_id,
            nickname,
            experience,
            introduction: introduction ?? "",
            image_url: image_url ?? "",
            level,
            roles,
            token_dto: {
              access_token,
              refresh_token,
            },
          },
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  http.post<PathParams, SignupRequest, SignupResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.signup}`,
    async ({ request }) => {
      // 회원가입

      const { email, password, nickname, image_url } = await request.json()

      const invalidFields = []

      if (!validator.validateEmail(email).allCheck()) {
        invalidFields.push("email")
      }
      if (!validator.validatePassword(password).allCheck()) {
        invalidFields.push("password")
      }
      if (!validator.validateNickname(nickname).allCheck()) {
        invalidFields.push("nickname")
      }

      if (invalidFields.length) {
        return HttpResponse.json(
          { code: HttpStatusCode.BadRequest, msg: "잘못된 요청입니다" },
          { status: HttpStatusCode.BadRequest },
        )
      }

      const latestId = Math.max(...mockUsers.map((user) => user.id))

      mockUsers.push({
        id: latestId + 1,
        email,
        password,
        nickname,
        authorities: ["ROLE_USER"],
        experience: 0,
        level: 0,
        account_status: ACCOUNT_STATUS.FALSE,
        image_url: null,
      })

      return HttpResponse.json(
        {
          code: HttpStatusCode.Ok,
          msg: "회원 가입 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  http.post<
    PathParams,
    DuplicateCheckEmailRequest,
    DuplicateCheckEmailResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.duplicateCheckEmail}`,
    async ({ request }) => {
      // 이메일 중복 체크
      const { email } = await request.json()

      if (!email || !validator.validateEmail(email).allCheck()) {
        return HttpResponse.json(
          {
            code: HttpStatusCode.BadRequest,
            msg: "잘못된 요청입니다.",
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        )
      }

      if (mockUsers.some((user) => user.email === email)) {
        return HttpResponse.json(
          {
            code: 1103,
            msg: "사용중인 이메일 입니다.",
          },
          {
            status: HttpStatusCode.Conflict,
          },
        )
      }

      return HttpResponse.json(
        {
          code: 1142,
          msg: "이메일 중복 확인 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  http.post<
    PathParams,
    DuplicateCheckNickNameRequest,
    DuplicateCheckNickNameResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.duplicateCheckNickname}`,
    async ({ request }) => {
      // 닉네임 중복 체크
      const { nickname } = await request.json()

      if (!nickname || !validator.validateNickname(nickname).allCheck()) {
        return HttpResponse.json(
          {
            code: HttpStatusCode.BadRequest,
            msg: "잘못된 요청입니다.",
          },
          { status: HttpStatusCode.BadRequest },
        )
      }

      if (mockUsers.some((user) => user.nickname === nickname)) {
        return HttpResponse.json(
          {
            code: 1102,
            msg: "사용중인 닉네임 입니다",
          },
          { status: HttpStatusCode.Conflict },
        )
      }

      return HttpResponse.json(
        {
          code: 1143,
          msg: "닉네임 중복 확인 성공",
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
  http.post<PathParams, LogoutRequest, LogoutResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.logout}`,
    async ({ request }) => {
      try {
        const TokenError = new Error("token error")

        const { access_token, refresh_token } = await request.json()

        if (!access_token || !refresh_token) {
          throw TokenError
        }

        return HttpResponse.json(
          { code: 1305, msg: "로그아웃 성공" },
          { status: HttpStatusCode.Ok },
        )
      } catch (error) {
        return HttpResponse.json(
          {
            code: 1300,
            msg: "토큰 정보 처리 중 에러가 발생했습니다.",
          },
          { status: HttpStatusCode.UnprocessableEntity },
        )
      }
    },
  ),
]

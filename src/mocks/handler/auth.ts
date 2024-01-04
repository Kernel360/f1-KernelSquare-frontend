import {
  ACCESS_TOKEN_KEY,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_KEY,
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
import { DefaultBodyType, http, HttpResponse, PathParams } from "msw"
import { mockUsers } from "../db/user"
import { jwtSign } from "@/util/actions/jwt"
import { LogoutResponse } from "@/interfaces/dto/auth/logout.dto"
import { ACCOUNT_STATUS } from "@/interfaces/user"
import { setCookie } from "cookies-next"
import { deleteCookie } from "@/util/actions/cookie"

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

      if (!existMockUser || !equalPassword) {
        return HttpResponse.json(
          {
            code: HttpStatusCode.BadRequest,
            msg: "잘못된 요청입니다",
          },
          { status: HttpStatusCode.BadRequest },
        )
      }

      const res = HttpResponse.json(
        {
          code: HttpStatusCode.Ok,
          msg: "로그인 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )

      const accessToken = await jwtSign(
        {
          id: existMockUser.id,
        },
        JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        },
      )

      const refreshToken = await jwtSign(
        {
          id: existMockUser.id,
        },
        JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: "14d" },
      )

      setCookie(ACCESS_TOKEN_KEY, accessToken, {
        path: "/",
        maxAge: 60 * 60,
      })

      setCookie(REFRESH_TOKEN_KEY, refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      })

      return res
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
            code: HttpStatusCode.Conflict,
            msg: "사용중인 이메일 입니다.",
          },
          {
            status: HttpStatusCode.Conflict,
          },
        )
      }

      return HttpResponse.json(
        {
          code: HttpStatusCode.Ok,
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
            code: HttpStatusCode.Conflict,
            msg: "사용중인 닉네임 입니다",
          },
          { status: HttpStatusCode.Conflict },
        )
      }

      return HttpResponse.json({
        code: HttpStatusCode.Ok,
        msg: "닉네임 중복 확인 성공",
      })
    },
  ),
  http.post<PathParams, DefaultBodyType, LogoutResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.logout}`,
    ({ request }) => {
      deleteCookie(ACCESS_TOKEN_KEY)
      deleteCookie(REFRESH_TOKEN_KEY)

      return HttpResponse.json(
        { code: HttpStatusCode.Ok, msg: "로그아웃 성공" },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
]

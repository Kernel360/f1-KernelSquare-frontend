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
import { http, HttpResponse, PathParams } from "msw"
import { mockUsers } from "../db/user"
import { jwtSign } from "@/util/actions/jwt"
import { LogoutRequest, LogoutResponse } from "@/interfaces/dto/auth/logout.dto"
import { ACCOUNT_STATUS } from "@/interfaces/user"
import { ApiStatus } from "@/constants/response/api"

const validator = new Validator()

export const authHandler = [
  http.post<PathParams, LoginRequest, LoginResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.login}`,
    async ({ request }) => {
      // 로그인
      try {
        const { email, password } = await request.json()

        const invalidFields = []

        if (!validator.validateEmail(email).allCheck()) {
          invalidFields.push("email")
        }
        if (!validator.validatePassword(password).allCheck()) {
          invalidFields.push("password")
        }

        if (invalidFields.length) {
          const { Code, HttpStatus } = ApiStatus.Auth.login.BadRequest
          return HttpResponse.json(
            {
              code: Code,
              msg: "잘못된 요청입니다",
            },
            { status: HttpStatus },
          )
        }

        const existMockUser = mockUsers.find((user) => user.email === email)
        const equalPassword = existMockUser
          ? existMockUser.password === password
          : false

        if (!existMockUser) {
          const { Code, HttpStatus } = ApiStatus.Auth.login.NotMatchedUser

          return HttpResponse.json(
            {
              code: Code,
              msg: "계정 정보가 일치하지 않습니다.",
            },
            {
              status: HttpStatus,
            },
          )
        }

        if (!equalPassword) {
          const { Code, HttpStatus } = ApiStatus.Auth.login.NotMatchedPassword
          return HttpResponse.json(
            {
              code: Code,
              msg: "비밀번호가 일치하지 않습니다.",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const { Code, HttpStatus } = ApiStatus.Auth.login.Ok

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
            code: Code,
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
            status: HttpStatus,
          },
        )
      } catch (error) {
        const { Code, HttpStatus } = ApiStatus.Auth.login.InternalServerError

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
  http.post<PathParams, SignupRequest, SignupResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.signup}`,
    async ({ request }) => {
      // 회원가입
      try {
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
          const { Code, HttpStatus } = ApiStatus.Auth.signup.BadRequest

          return HttpResponse.json(
            { code: Code, msg: "잘못된 요청입니다" },
            { status: HttpStatus },
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

        const { Code, HttpStatus } = ApiStatus.Auth.signup.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "회원 가입 성공",
          },
          {
            status: HttpStatus,
          },
        )
      } catch (error) {
        const { Code, HttpStatus } = ApiStatus.Auth.signup.InternalServerError

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
  http.post<
    PathParams,
    DuplicateCheckEmailRequest,
    DuplicateCheckEmailResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.duplicateCheckEmail}`,
    async ({ request }) => {
      // 이메일 중복 체크
      try {
        const { email } = await request.json()

        if (!email || !validator.validateEmail(email).allCheck()) {
          const { Code, HttpStatus } =
            ApiStatus.Auth.duplicateCheckEmail.BadRequest

          return HttpResponse.json(
            {
              code: Code,
              msg: "잘못된 요청입니다.",
            },
            {
              status: HttpStatus,
            },
          )
        }

        if (mockUsers.some((user) => user.email === email)) {
          const { Code, HttpStatus } =
            ApiStatus.Auth.duplicateCheckEmail.Conflict

          return HttpResponse.json(
            {
              code: Code,
              msg: "사용중인 이메일 입니다.",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const { Code, HttpStatus } = ApiStatus.Auth.duplicateCheckEmail.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "이메일 중복 확인 성공",
          },
          {
            status: HttpStatus,
          },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.Auth.duplicateCheckEmail.InternalServerError

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
  http.post<
    PathParams,
    DuplicateCheckNickNameRequest,
    DuplicateCheckNickNameResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.duplicateCheckNickname}`,
    async ({ request }) => {
      // 닉네임 중복 체크
      try {
        const { nickname } = await request.json()

        if (!nickname || !validator.validateNickname(nickname).allCheck()) {
          const { Code, HttpStatus } =
            ApiStatus.Auth.duplicateCheckNickname.BadRequest

          return HttpResponse.json(
            {
              code: Code,
              msg: "잘못된 요청입니다.",
            },
            { status: HttpStatus },
          )
        }

        if (mockUsers.some((user) => user.nickname === nickname)) {
          const { Code, HttpStatus } =
            ApiStatus.Auth.duplicateCheckNickname.Conflict

          return HttpResponse.json(
            {
              code: Code,
              msg: "사용중인 닉네임 입니다",
            },
            { status: HttpStatus },
          )
        }

        const { Code, HttpStatus } = ApiStatus.Auth.duplicateCheckNickname.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "닉네임 중복 확인 성공",
          },
          { status: HttpStatus },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.Auth.duplicateCheckNickname.InternalServerError

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
  http.post<PathParams, LogoutRequest, LogoutResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.logout}`,
    async ({ request }) => {
      const TokenError = new Error("token error")

      try {
        const { access_token, refresh_token } = await request.json()

        if (!access_token || !refresh_token) {
          throw TokenError
        }

        const { Code, HttpStatus } = ApiStatus.Auth.logout.Ok

        return HttpResponse.json(
          { code: Code, msg: "로그아웃 성공" },
          { status: HttpStatus },
        )
      } catch (error) {
        if (error instanceof Error && error.message === TokenError.message) {
          const { Code, HttpStatus } = ApiStatus.Auth.logout.TokenError

          return HttpResponse.json(
            {
              code: Code,
              msg: "토큰 정보 처리 중 에러가 발생했습니다.",
            },
            { status: HttpStatus },
          )
        }

        const { Code, HttpStatus } = ApiStatus.Auth.logout.InternalServerError

        return HttpResponse.json(
          {
            code: Code,
            msg: "서버 오류",
          },
          { status: HttpStatus },
        )
      }
    },
  ),
]

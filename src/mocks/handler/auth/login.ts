import { ApiStatus } from "@/constants/response/api"
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} from "@/constants/token"
import { LoginRequest, LoginResponse } from "@/interfaces/dto/auth/login.dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { jwtSign } from "@/util/actions/jwt"
import { validatorInstance } from "@/util/validate"
import { HttpResponse, PathParams, http } from "msw"

export const mockLoginApi = http.post<PathParams, LoginRequest, LoginResponse>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.login}`,
  async ({ request }) => {
    try {
      const { email, password } = await request.json()

      const invalidFields = []

      if (!validatorInstance.validateEmail(email).allCheck()) {
        invalidFields.push("email")
      }
      if (!validatorInstance.validatePassword(password).allCheck()) {
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
)

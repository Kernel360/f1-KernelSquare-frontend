import { ApiStatus } from "@/constants/response/api"
import { SignupRequest, SignupResponse } from "@/interfaces/dto/auth/signup.dto"
import { ACCOUNT_STATUS } from "@/interfaces/user"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { validatorInstance } from "@/util/validate"
import { HttpResponse, PathParams, http } from "msw"

export const mockSignupApi = http.post<
  PathParams,
  SignupRequest,
  SignupResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.signup}`,
  async ({ request }) => {
    try {
      const { email, password, nickname, image_url } = await request.json()

      const invalidFields = []

      if (!validatorInstance.validateEmail(email).allCheck()) {
        invalidFields.push("email")
      }
      if (!validatorInstance.validatePassword(password).allCheck()) {
        invalidFields.push("password")
      }
      if (!validatorInstance.validateNickname(nickname).allCheck()) {
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
        level: 1,
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
)

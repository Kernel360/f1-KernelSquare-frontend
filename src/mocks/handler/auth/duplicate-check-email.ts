import { ApiStatus } from "@/constants/response/api"
import {
  DuplicateCheckEmailRequest,
  DuplicateCheckEmailResponse,
} from "@/interfaces/dto/auth/duplicate-check-email.dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { validatorInstance } from "@/util/validate"
import { HttpResponse, PathParams, http } from "msw"

export const mockDuplicateCheckEmailApi = http.post<
  PathParams,
  DuplicateCheckEmailRequest,
  DuplicateCheckEmailResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.duplicateCheckEmail}`,
  async ({ request }) => {
    try {
      const { email } = await request.json()

      if (!email || !validatorInstance.validateEmail(email).allCheck()) {
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
        const { Code, HttpStatus } = ApiStatus.Auth.duplicateCheckEmail.Conflict

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
)

import { ApiStatus } from "@/constants/response/api"
import {
  DuplicateCheckNickNameRequest,
  DuplicateCheckNickNameResponse,
} from "@/interfaces/dto/auth/duplicate-check-nickname.dto"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { validatorInstance } from "@/util/validate"
import { HttpResponse, PathParams, http } from "msw"

export const mockDuplicateCheckNicknameApi = http.post<
  PathParams,
  DuplicateCheckNickNameRequest,
  DuplicateCheckNickNameResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.auth.duplicateCheckNickname}`,
  async ({ request }) => {
    // 닉네임 중복 체크
    try {
      const { nickname } = await request.json()

      if (
        !nickname ||
        !validatorInstance.validateNickname(nickname).allCheck()
      ) {
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
)

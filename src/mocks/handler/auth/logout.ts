import { ApiStatus } from "@/constants/response/api"
import { LogoutRequest, LogoutResponse } from "@/interfaces/dto/auth/logout.dto"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, PathParams, http } from "msw"

export const mockLogoutApi = http.post<
  PathParams,
  LogoutRequest,
  LogoutResponse
>(
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
)

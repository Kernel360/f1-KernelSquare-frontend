import { ApiStatus } from "@/constants/response/api"
import { GetMyCoffeeChatReservationListResponse } from "@/interfaces/dto/coffee-chat/get-my-coffeechat-reservation"
import { MockReservations } from "@/mocks/db/coffee-chat"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import { JWT_ACCESS_TOKEN_SECRET } from "@/constants/token"
import { mockUsers } from "@/mocks/db/user"
import { jwtVerify } from "@/util/actions/jwt"

export const mockGetMyCoffeeChatReservationApi = http.get<
  PathParams,
  DefaultBodyType,
  GetMyCoffeeChatReservationListResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.getMyCoffeeChatReservation}`,
  async ({ request }) => {
    try {
      const authHeader = request.headers.get("Authorization")

      const { Code: UnauthorizedCode, HttpStatus: UnauthorizedStatus } =
        ApiStatus.CoffeeChat.getCoffeeChatPostDetail.Unauthorized

      if (!authHeader) {
        return HttpResponse.json(
          {
            code: UnauthorizedCode,
            msg: "권한이 없는 사용자입니다.",
          },
          { status: UnauthorizedStatus },
        )
      }

      const token = authHeader.replace(/^Bearer /g, "")

      if (!token) {
        return HttpResponse.json(
          {
            code: UnauthorizedCode,
            msg: "권한이 없는 사용자입니다.",
          },
          { status: UnauthorizedStatus },
        )
      }

      try {
        const decoded = await jwtVerify(token, JWT_ACCESS_TOKEN_SECRET)

        const user = mockUsers.find((user) => user.id === decoded.id)

        if (!user) {
          return HttpResponse.json(
            {
              code: UnauthorizedCode,
              msg: "권한이 없는 사용자입니다.",
            },
            { status: UnauthorizedStatus },
          )
        }

        const reservation = MockReservations.filter(
          (post) => post.mentee_nickname === user.nickname,
        )

        if (!reservation) {
          const { Code, HttpStatus } =
            ApiStatus.CoffeeChat.getCoffeeChatPostDetail.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "존재하지 않는 예약입니다",
            },
            { status: HttpStatus },
          )
        }

        const { Code, HttpStatus } =
          ApiStatus.CoffeeChat.getCoffeeChatPostDetail.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "예약창을 조회했습니다.",
            data: {
              reservation_responses: [...reservation],
            },
          },
          { status: HttpStatus },
        )
      } catch (error) {
        return HttpResponse.json(
          {
            code: UnauthorizedCode,
            msg: "권한이 없는 사용자입니다.",
          },
          { status: UnauthorizedStatus },
        )
      }
    } catch (error) {
      const { Code, HttpStatus } =
        ApiStatus.CoffeeChat.getCoffeeChatPostDetail.InternalServerError

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

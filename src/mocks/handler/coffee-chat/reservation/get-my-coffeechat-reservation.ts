import { ApiStatus } from "@/constants/response/api"
import { useClientSession } from "@/hooks/useClientSession"
import { GetMyCoffeeChatReservationListResponse } from "@/interfaces/dto/coffee-chat/get-my-coffeechat-reservation"
import { MockReservations } from "@/mocks/db/coffee-chat"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockGetMyCoffeeChatReservationApi = http.get<
  PathParams,
  DefaultBodyType,
  GetMyCoffeeChatReservationListResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.getMyCoffeeChatReservation}`,
  async ({ params }) => {
    try {
      const { user } = useClientSession()
      if (!user) {
        const { Code, HttpStatus } =
          ApiStatus.CoffeeChat.getCoffeeChatPostDetail.Unauthorized

        return HttpResponse.json(
          {
            code: Code,
            msg: "권한이 없는 사용자입니다.",
          },
          { status: HttpStatus },
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
            ...reservation,
          },
        },
        { status: HttpStatus },
      )
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

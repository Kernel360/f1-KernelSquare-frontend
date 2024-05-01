import { ApiStatus } from "@/constants/response/api"
import { GetCoffeeChatReservationDetailResponse } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockGetCoffeeChatDetailApi = http.get<
  { id: string },
  DefaultBodyType,
  GetCoffeeChatReservationDetailResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.coffeeChat.getCoffeeChatDetail()}`,
  async ({ params }) => {
    try {
      const reservationId = params.id

      if (Number.isNaN(Number(reservationId)) || Number(reservationId) < 0) {
        const { Code, HttpStatus } =
          ApiStatus.CoffeeChat.getCoffeeChatPostDetail.BadRequest

        return HttpResponse.json(
          {
            code: Code,
            msg: "잘못된 요청입니다",
          },
          { status: HttpStatus },
        )
      }

      const reservation = mockCoffeeChatReservations.find(
        (reservation) => reservation.article_id === Number(reservationId),
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

      const payload = {
        ...reservation,
        hashtags: reservation.hash_tag_list.map((hashTag, index) => ({
          hashtag_id: index + 1,
          content: hashTag,
        })),
      } as NonNullable<GetCoffeeChatReservationDetailResponse["data"]>

      const { Code, HttpStatus } =
        ApiStatus.CoffeeChat.getCoffeeChatPostDetail.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "예약창을 조회했습니다.",
          data: {
            ...payload,
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

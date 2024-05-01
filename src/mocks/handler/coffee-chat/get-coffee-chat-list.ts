import { ApiStatus } from "@/constants/response/api"
import {
  CoffeeChatReservation,
  GetCoffeeChatReservationListResponse,
} from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockGetCoffeeChatListApi = http.get<
  PathParams,
  DefaultBodyType,
  GetCoffeeChatReservationListResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.getCoffeeChatList}`,
  async ({ request }) => {
    try {
      const url = new URL(request.url)

      const page = Number(url.searchParams.get("page"))
      const perPage = Number(url.searchParams.get("size"))

      const invalidQueries = []

      // page는 0부터 시작
      if (page < 0 || Number.isNaN(page)) invalidQueries.push("page")
      if (perPage <= 0 || Number.isNaN(perPage)) invalidQueries.push("size")

      if (invalidQueries.length) {
        const { Code, HttpStatus } =
          ApiStatus.CoffeeChat.getAllCoffeeChatPosts.BadRequest

        return HttpResponse.json(
          { code: Code, msg: "잘못된 요청입니다" },
          { status: HttpStatus },
        )
      }

      const { pages, maximumPage } = generatePagination<
        Omit<CoffeeChatReservation, "date_times">
      >(
        mockCoffeeChatReservations.map((mockReservation) => {
          const { date_times, ...reservation } = mockReservation

          return { ...reservation }
        }),
        { perPage: 5 },
      )

      const pagePayload = pages[page] ?? []

      if (mockCoffeeChatReservations.length && !pagePayload?.length) {
        const { Code, HttpStatus } =
          ApiStatus.CoffeeChat.getAllCoffeeChatPosts.NotFound

        return HttpResponse.json(
          {
            code: Code,
            msg: "존재하지 않는 페이지",
          },
          { status: HttpStatus },
        )
      }

      const { Code, HttpStatus } = ApiStatus.CoffeeChat.getAllCoffeeChatPosts.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "모든 예약창을 조회했습니다.",
          data: {
            pagination: {
              total_page: maximumPage,
              pageable: pagePayload.length,
              is_end: page === maximumPage - 1,
            },
            list: [...pagePayload],
          },
        },
        { status: HttpStatus },
      )
    } catch (error) {
      const { Code, HttpStatus } =
        ApiStatus.CoffeeChat.getAllCoffeeChatPosts.InternalServerError

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

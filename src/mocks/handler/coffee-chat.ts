import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import { MockCoffeechat, mockCoffeeChatReservations } from "../db/coffee-chat"
import { ApiStatus } from "@/constants/response/api"
import type {
  CoffeeChatReservation,
  GetCoffeeChatReservationListResponse,
} from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"
import type { GetCoffeeChatReservationDetailResponse } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import type {
  EnterChatRoomRequest,
  EnterChatRoomResponse,
} from "@/interfaces/dto/coffee-chat/enter-chat-room"
import {
  CreateCoffeeChatReservationRequest,
  CreateCoffeeChatReservationResponse,
} from "@/interfaces/dto/coffee-chat/create-coffeechat-reservation.dto"
import { mockUsers } from "../db/user"
import { HttpStatusCode } from "axios"
import dayjs from "dayjs"
import badge_url from "@/assets/images/badges"
import { User } from "@/interfaces/user"

export const coffeeChatHandler = [
  http.get<PathParams, DefaultBodyType, GetCoffeeChatReservationListResponse>(
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

        const { Code, HttpStatus } =
          ApiStatus.CoffeeChat.getAllCoffeeChatPosts.Ok

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
  ),
  http.get<
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
        console.log("target", reservation)

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
  ),
  http.post<PathParams, EnterChatRoomRequest, EnterChatRoomResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.enterCoffeeChatRoom}`,
    async ({ request }) => {
      const { member_id, room_id, article_title } = await request.json()

      const { Code, HttpStatus } = ApiStatus.CoffeeChat.enterChatRoom.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "채팅방 입장 성공",
          data: {
            article_title,
            room_key: "test_room_key",
            active: true,
          },
        },
        {
          status: HttpStatus,
        },
      )
    },
  ),
  // 커피챗 등록글 생성
  http.post<
    PathParams,
    CreateCoffeeChatReservationRequest,
    CreateCoffeeChatReservationResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.createCoffeeChatPost}`,
    async ({ request }) => {
      const { member_id, title, content, hash_tags, date_times } =
        await request.json()

      const targetMember = mockUsers.find((member) => member.id === member_id)

      if (!targetMember) {
        return HttpResponse.json(
          {
            code: 2121,
            msg: "답변을 입력할 권한이 없습니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const article_id = mockCoffeeChatReservations.length + 1

      const newCoffeeChatPost: MockCoffeechat = {
        article_id,
        title,
        content,
        hashtags: hash_tags,
        date_times: date_times.map((date, i) => ({
          reservation_id: Math.random() * 10000,
          room_id: Math.random() * 10000,
          start_time: date,
          menti_nickname: null,
          menti_image_url: null,
        })),
        created_date: dayjs().format(),
        modified_date: dayjs().format(),
        article_status: true,
        full_check: 0,
        member_id,
        nickname: targetMember.nickname,
        member_image_url: targetMember.image_url,
        level: targetMember.level,
        level_image_url: badge_url[targetMember.level],
      }

      mockCoffeeChatReservations.push(newCoffeeChatPost)
      console.log("mock", mockCoffeeChatReservations)

      return HttpResponse.json(
        {
          code: 3140,
          msg: "예약창이 생성되었습니다.",
          data: { reservation_article_id: article_id },
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
]

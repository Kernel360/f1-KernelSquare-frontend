import dayjs from "dayjs"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import {
  MockCoffeechat,
  MockReservations,
  mockCoffeeChatReservations,
} from "../db/coffee-chat"
import { ApiStatus } from "@/constants/response/api"
import { mockUsers } from "../db/user"
import { HttpStatusCode } from "axios"
import badge_url from "@/assets/images/badges"
import { useClientSession } from "@/hooks/useClientSession"
import type {
  CoffeeChatReservation,
  GetCoffeeChatReservationListResponse,
} from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"
import type { GetCoffeeChatReservationDetailResponse } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import type {
  EnterChatRoomRequest,
  EnterChatRoomResponse,
} from "@/interfaces/dto/coffee-chat/enter-chat-room"
import type {
  CreateCoffeeChatReservationRequest,
  CreateCoffeeChatReservationResponse,
} from "@/interfaces/dto/coffee-chat/create-coffeechat-reservation.dto"
import type { DeleteCoffeeChatResponse } from "@/interfaces/dto/coffee-chat/delete-coffeechat.dto"
import type { GetMyCoffeeChatReservationListResponse } from "@/interfaces/dto/coffee-chat/get-my-coffeechat-reservation"
import type {
  MakeReservationRequest,
  MakeReservationResponse,
} from "@/interfaces/dto/coffee-chat/make-reservation.dto"
import type {
  DeleteReservationRequest,
  DeleteReservationResponse,
} from "@/interfaces/dto/coffee-chat/delete-reservation.dto"

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
            expiration_time: dayjs()
              .add(30, "minutes")
              .format("YYYY-MM-DDTHH:mm:ss"),
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
        hash_tag_list: hash_tags,
        date_times: date_times.map((date, i) => ({
          reservation_id: Math.random() * 10000,
          room_id: Math.random() * 10000,
          start_time: date,
          mentee_nickname: null,
          mentee_image_url: null,
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
  // 커피챗 등록글 삭제
  http.delete<{ id: string }, DefaultBodyType, DeleteCoffeeChatResponse>(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.coffeeChat.deleteCoffeeChatPost()}`,
    async ({ params }) => {
      const postId = Number(params.id)

      const targetPost = mockCoffeeChatReservations.findIndex(
        (post) => post.article_id === postId,
      )

      mockCoffeeChatReservations.splice(targetPost, 1)

      return HttpResponse.json(
        {
          code: 3143,
          msg: "예약창이 삭제되었습니다.",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  // 커피챗 예약
  http.put<PathParams, MakeReservationRequest, MakeReservationResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.coffeeChatReservation}`,
    async ({ request }) => {
      const { reservation_article_id, reservation_id, member_id, start_time } =
        await request.json()
      const targetMember = mockUsers.find((member) => member.id === member_id)

      if (!targetMember) {
        return HttpResponse.json(
          {
            code: 3404,
            msg: "회원이 존재하지 않습니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const targetArticle = mockCoffeeChatReservations.find(
        (article) => article.article_id === reservation_article_id,
      )

      if (!targetArticle) {
        return HttpResponse.json(
          {
            code: 3401,
            msg: "존재하지 않는 예약입니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const targetReservation = MockReservations.find(
        (res) => res.reservation_id === reservation_id,
      )

      if (!targetReservation) {
        return HttpResponse.json(
          {
            code: 3406,
            msg: "예약하신 예약 창을 찾을 수 없습니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const targetTime = targetArticle.date_times.find(
        (time) => time.start_time === start_time,
      )

      if (!targetTime) {
        return HttpResponse.json(
          {
            code: 3408,
            msg: "예약 가능한 시간이 아닙니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const myReservation = MockReservations.filter(
        (res) => res.mentee_nickname === targetMember.nickname,
      )

      if (myReservation.length > 10) {
        return HttpResponse.json(
          {
            code: 3403,
            msg: "예약 가능한 게시글 제한 개수를 넘었습니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const hasSameMentoring = targetArticle.date_times.some(
        (res) =>
          res.mentee_nickname === targetMember.nickname &&
          res.reservation_id !== reservation_id,
      )

      if (hasSameMentoring) {
        return HttpResponse.json(
          {
            code: 3407,
            msg: "이미 동일한 멘토링을 예약하셨습니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      const hasDuplicateMentoringTime = MockReservations.find(
        (res) =>
          res.start_time === start_time &&
          res.reservation_id !== reservation_id &&
          res.mentee_nickname === targetMember.nickname,
      )

      if (hasDuplicateMentoringTime) {
        return HttpResponse.json(
          {
            code: 3409,
            msg: "해당 시간에 이미 다른 멘토링 예약이 존재합니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      return HttpResponse.json(
        {
          code: 3442,
          msg: "예약이 확정되었습니다.",
          data: {
            reservation_id: reservation_article_id * Math.random() * 1000,
          },
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  // 커피챗 예약 삭제
  http.delete<
    { id: string },
    Omit<DeleteReservationRequest, "reservationId">,
    DeleteReservationResponse
  >(
    `${
      process.env.NEXT_PUBLIC_SERVER
    }${RouteMap.coffeeChat.deleteCoffeeChatReservation()}`,
    async ({ params }) => {
      const reservationId = Number(params.id)

      const targetReservation = MockReservations.find(
        (res) => res.reservation_id === reservationId,
      )

      if (!targetReservation) {
        return HttpResponse.json(
          {
            code: 3401,
            msg: "존재하지 않는 예약입니다.",
          },
          {
            status: HttpStatusCode.Forbidden,
          },
        )
      }

      // if (dayjs(targetReservation.start_time).diff(dayjs(), "hour") <= 24) {
      //   return HttpResponse.json(
      //     {
      //       code: 3402,
      //       msg: "예약 취소 가능 시간이 지났습니다.",
      //     },
      //     {
      //       status: HttpStatusCode.Forbidden,
      //     },
      //   )
      // }

      return HttpResponse.json(
        {
          code: 3441,
          msg: "예약 삭제 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  // 내가 한 커피챗 예약 조회
  http.get<PathParams, DefaultBodyType, GetMyCoffeeChatReservationListResponse>(
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
  ),
]

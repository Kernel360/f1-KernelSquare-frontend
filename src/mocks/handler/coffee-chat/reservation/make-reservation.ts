import {
  MakeReservationRequest,
  MakeReservationResponse,
} from "@/interfaces/dto/coffee-chat/make-reservation.dto"
import {
  MockReservations,
  mockCoffeeChatReservations,
} from "@/mocks/db/coffee-chat"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, PathParams, http } from "msw"

export const mockMakeCoffeeChatReservationApi = http.put<
  PathParams,
  MakeReservationRequest,
  MakeReservationResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.coffeeChatReservation}`,
  async ({ request }) => {
    const {
      reservation_article_id,
      reservation_id,
      member_id,
      reservation_start_time,
    } = await request.json()
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

    const targetTimeIndex = targetArticle.date_times.findIndex(
      (time) => time.start_time === reservation_start_time,
    )

    if (targetTimeIndex === -1) {
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
          msg: "이미 동일한 커피챗을 예약하셨습니다.",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      )
    }

    const hasDuplicateMentoringTime = MockReservations.find(
      (res) =>
        res.start_time === reservation_start_time &&
        res.reservation_id !== reservation_id &&
        res.mentee_nickname === targetMember.nickname,
    )

    if (hasDuplicateMentoringTime) {
      return HttpResponse.json(
        {
          code: 3409,
          msg: "해당 시간에 이미 다른 커피챗 예약이 존재합니다.",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      )
    }

    const prev = targetArticle.date_times[targetTimeIndex]

    targetArticle.date_times[targetTimeIndex] = {
      ...prev,
      mentee_nickname: targetMember.nickname,
      mentee_image_url: targetMember.image_url,
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
)

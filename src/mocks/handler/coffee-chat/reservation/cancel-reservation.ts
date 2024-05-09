import {
  DeleteReservationRequest,
  DeleteReservationResponse,
} from "@/interfaces/dto/coffee-chat/delete-reservation.dto"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockCancelCoffeeChatReservationApi = http.delete<
  { id: string },
  Omit<DeleteReservationRequest, "reservationId">,
  DeleteReservationResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.coffeeChat.deleteCoffeeChatReservation()}`,
  async ({ params }) => {
    const reservationId = Number(params.id)

    const targetReservationIdx = mockCoffeeChatReservations.findIndex(
      (reservation) =>
        reservation.date_times.find(
          (dateTime) => dateTime.reservation_id === reservationId,
        ),
    )

    if (targetReservationIdx === -1) {
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

    const reservation = mockCoffeeChatReservations[targetReservationIdx]
    const targetDateTimeIdx = reservation.date_times.findIndex(
      (dateTime) => dateTime.reservation_id === reservationId,
    )

    const prev = reservation.date_times[targetDateTimeIdx]

    reservation.date_times[targetDateTimeIdx] = {
      ...prev,
      mentee_nickname: null,
      mentee_image_url: null,
    }

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
)

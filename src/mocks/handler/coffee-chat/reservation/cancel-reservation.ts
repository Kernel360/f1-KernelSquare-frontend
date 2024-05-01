import {
  DeleteReservationRequest,
  DeleteReservationResponse,
} from "@/interfaces/dto/coffee-chat/delete-reservation.dto"
import { MockReservations } from "@/mocks/db/coffee-chat"
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

    const targetReservation = MockReservations.findIndex(
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

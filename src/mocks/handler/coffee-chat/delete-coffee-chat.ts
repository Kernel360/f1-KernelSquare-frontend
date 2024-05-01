import { DeleteCoffeeChatResponse } from "@/interfaces/dto/coffee-chat/delete-coffeechat.dto"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockDeleteCoffeeChatApi = http.delete<
  { id: string },
  DefaultBodyType,
  DeleteCoffeeChatResponse
>(
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
)

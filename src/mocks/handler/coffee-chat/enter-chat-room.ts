import { ApiStatus } from "@/constants/response/api"
import {
  EnterChatRoomRequest,
  EnterChatRoomResponse,
} from "@/interfaces/dto/coffee-chat/enter-chat-room"
import { RouteMap } from "@/service/route-map"
import dayjs from "dayjs"
import { HttpResponse, PathParams, http } from "msw"

export const mockEnterChatRoomApi = http.post<
  PathParams,
  EnterChatRoomRequest,
  EnterChatRoomResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.coffeeChat.enterCoffeeChatRoom}`,
  async ({ request }) => {
    const { article_title, reservation_id } = await request.json()

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
)

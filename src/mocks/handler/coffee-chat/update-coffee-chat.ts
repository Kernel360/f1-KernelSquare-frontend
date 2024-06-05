import { ApiStatus } from "@/constants/response/api"
import {
  UpdateCoffeeChatPostRequest,
  UpdateCoffeeChatPostResponse,
} from "@/interfaces/dto/coffee-chat/update-coffeechat-post.dto"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockUpdateCoffeeChatApi = http.put<
  { id: string },
  UpdateCoffeeChatPostRequest,
  UpdateCoffeeChatPostResponse
>(
  `${
    process.env.NEXT_PUBLIC_SERVER
  }${RouteMap.coffeeChat.updateCoffeeChatPost()}`,
  async ({ request, params }) => {
    const articleId = Number(params.id)

    const header = request.headers
    const authHeader = header.get("Authorization")

    if (!authHeader) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          msg: "인증되지 않은 유저입니다",
        },
        { status: HttpStatusCode.Unauthorized },
      )
    }

    const {
      article_id,
      member_id,
      title,
      introduction,
      content,
      change_hashtags,
      change_reservations,
    } = await request.json()

    const user = mockUsers.find((user) => user.id === member_id)
    const coffeeChat = mockCoffeeChatReservations.find(
      (reservation) => reservation.article_id === article_id,
    )

    if (!user || !coffeeChat) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.NotFound,
          msg: "찾을 수 없습니다",
        },
        {
          status: HttpStatusCode.NotFound,
        },
      )
    }

    if (
      !user.authorities.includes("ROLE_MENTOR") ||
      user.id !== coffeeChat.member_id
    ) {
      const { Code, HttpStatus } =
        ApiStatus.CoffeeChat.updateCoffeeChatPost.NotChatAuthor

      return HttpResponse.json(
        {
          code: Code,
          msg: "수정할 권한이 없습니다",
        },
        {
          status: HttpStatus,
        },
      )
    }

    coffeeChat.title = title
    coffeeChat.introduction = introduction
    coffeeChat.content = content

    if (change_hashtags?.length) {
      for (const { changed, content } of change_hashtags) {
        if (changed === "remove") {
          const index = coffeeChat.hash_tag_list.findIndex(
            (hashTag) => hashTag === content,
          )
          coffeeChat.hash_tag_list.splice(index, 1)

          continue
        }

        coffeeChat.hash_tag_list.push(content)
      }
    }

    if (change_reservations?.length) {
      for (const {
        changed,
        reservation_id,
        start_time,
      } of change_reservations) {
        if (changed === "remove") {
          const index = coffeeChat.date_times.findIndex(
            (dateTime) => dateTime.reservation_id === reservation_id,
          )
          coffeeChat.date_times.splice(index, 1)

          continue
        }

        coffeeChat.date_times.push({
          mentee_image_url: null,
          mentee_nickname: null,
          room_id: 999,
          reservation_id: 999,
          start_time,
        })
      }
    }

    return HttpResponse.json(
      {
        code: ApiStatus.CoffeeChat.updateCoffeeChatPost.Ok.Code,
        msg: "수정을 성공했습니다",
      },
      { status: HttpStatusCode.Ok },
    )
  },
)

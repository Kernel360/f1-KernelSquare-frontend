import badge_url from "@/assets/images/badges"
import {
  CreateCoffeeChatPostRequest,
  CreateCoffeeChatPostResponse,
} from "@/interfaces/dto/coffee-chat/create-coffeechat-post.dto"
import {
  MockCoffeechat,
  mockCoffeeChatReservations,
} from "@/mocks/db/coffee-chat"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import dayjs from "dayjs"
import { HttpResponse, PathParams, http } from "msw"

export const mockCreateCoffeeChatApi = http.post<
  PathParams,
  CreateCoffeeChatPostRequest,
  CreateCoffeeChatPostResponse
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
      introduction: content,
      coffee_chat_count: 0,
      available_reservation_count: date_times.length,
      total_reservation_count: date_times.length,
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
)

import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import type {
  GetCoffeeChatReservationListRequest,
  GetCoffeeChatReservationListResponse,
} from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"
import type {
  GetCoffeeChatReservationDetailRequest,
  GetCoffeeChatReservationDetailResponse,
} from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import type {
  CreateCoffeeChatReservationRequest,
  CreateCoffeeChatReservationResponse,
} from "@/interfaces/dto/coffee-chat/create-coffeechat-reservation.dto"
import type { AxiosResponse } from "axios"
import type {
  EnterChatRoomRequest,
  EnterChatRoomResponse,
} from "@/interfaces/dto/coffee-chat/enter-chat-room"

export async function getCoffeeChatReservationList(
  { page = 0, size = 5 }: GetCoffeeChatReservationListRequest = {
    page: 0,
    size: 5,
  },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)

  const res = await apiInstance.get<GetCoffeeChatReservationListResponse>(
    `${RouteMap.coffeeChat.getCoffeeChatList}?${searchParams.toString()}`,
  )

  return res
}

export async function getCoffeeChatReservationDetail({
  postId,
}: GetCoffeeChatReservationDetailRequest) {
  const res = await apiInstance.get<GetCoffeeChatReservationDetailResponse>(
    `${RouteMap.coffeeChat.getCoffeeChatDetail(postId)}`,
  )

  return res
}

export async function createCoffeeChatReservation({
  member_id,
  title,
  content,
  hash_tags,
  date_times,
}: CreateCoffeeChatReservationRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateCoffeeChatReservationResponse>,
    CreateCoffeeChatReservationRequest
  >(RouteMap.coffeeChat.createCoffeeChatPost, {
    member_id,
    title,
    content,
    hash_tags,
    date_times,
  })

  return res
}

export async function enterChatRoom({
  article_title,
  member_id,
  room_id,
}: EnterChatRoomRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<EnterChatRoomResponse>,
    EnterChatRoomRequest
  >(RouteMap.coffeeChat.enterCoffeeChatRoom, {
    article_title,
    room_id,
    member_id,
  })

  return res
}

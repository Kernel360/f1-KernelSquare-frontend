import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import { AxiosError } from "axios"
import { DefaultBodyType } from "msw"
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
import type {
  DeleteCoffeeChatRequest,
  DeleteCoffeeChatResponse,
} from "@/interfaces/dto/coffee-chat/delete-coffeechat.dto"
import type { APIResponse } from "@/interfaces/dto/api-response"
import type {
  MakeReservationRequest,
  MakeReservationResponse,
} from "@/interfaces/dto/coffee-chat/make-reservation.dto"
import type { DeleteReservationRequest } from "@/interfaces/dto/coffee-chat/delete-reservation.dto"
import type {
  GetMyCoffeeChatReservationListResponse,
  GetMyCoffeeChatReservationRequest,
} from "@/interfaces/dto/coffee-chat/get-my-coffeechat-reservation"

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

// 커피챗 등록글 생성
export async function createCoffeeChatPost({
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
    content,
    title,
    hash_tags,
    date_times,
  })

  return res
}

// 커피챗 등록글 삭제
export async function deleteCoffeeChatPost({
  postId,
}: DeleteCoffeeChatRequest) {
  const res = await apiInstance
    .delete<any, AxiosResponse<DeleteCoffeeChatResponse>, DefaultBodyType>(
      RouteMap.coffeeChat.deleteCoffeeChatPost(postId),
    )
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

// 커피챗 예약
export async function makeReservation({
  reservation_article_id,
  reservation_id,
  member_id,
  start_time,
}: MakeReservationRequest) {
  const res = await apiInstance
    .put<any, AxiosResponse<MakeReservationResponse>, MakeReservationRequest>(
      RouteMap.coffeeChat.coffeeChatReservation,
      {
        reservation_article_id,
        reservation_id,
        member_id,
        start_time,
      },
    )
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

// 커피챗 예약 삭제
export async function deleteCoffeeChatReservation({
  reservationId,
}: DeleteReservationRequest) {
  const res = await apiInstance
    .delete<any, AxiosResponse<DeleteCoffeeChatResponse>, DefaultBodyType>(
      RouteMap.coffeeChat.deleteCoffeeChatReservation(reservationId),
    )
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

// 내가 한 커피챗 예약 조회
export async function getMyCoffeeChatReservation() {
  const res = await apiInstance.get<GetMyCoffeeChatReservationListResponse>(
    `${RouteMap.coffeeChat.getMyCoffeeChatReservation}`,
  )

  return res
}

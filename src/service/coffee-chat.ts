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
  CreateCoffeeChatPostRequest,
  CreateCoffeeChatPostResponse,
} from "@/interfaces/dto/coffee-chat/create-coffeechat-post.dto"
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
import {
  UpdateCoffeeChatPostRequest,
  UpdateCoffeeChatPostResponse,
} from "@/interfaces/dto/coffee-chat/update-coffeechat-post.dto"

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

export async function enterChatRoom({
  article_title,
  reservation_id,
}: EnterChatRoomRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<EnterChatRoomResponse>,
    EnterChatRoomRequest
  >(RouteMap.coffeeChat.enterCoffeeChatRoom, {
    article_title,
    reservation_id,
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
  introduction,
}: CreateCoffeeChatPostRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateCoffeeChatPostResponse>,
    CreateCoffeeChatPostRequest
  >(RouteMap.coffeeChat.createCoffeeChatPost, {
    member_id,
    content,
    title,
    hash_tags,
    date_times,
    introduction,
  })

  return res
}

// 커피챗 등록글 수정
export async function updateCoffeeChatPost({
  article_id,
  ...payload
}: UpdateCoffeeChatPostRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateCoffeeChatPostResponse>,
    UpdateCoffeeChatPostRequest
  >(RouteMap.coffeeChat.updateCoffeeChatPost(article_id), {
    article_id,
    ...payload,
  })

  return res
}

// 커피챗 등록글 삭제
export async function deleteCoffeeChatPost({
  postId,
}: DeleteCoffeeChatRequest) {
  const res = await apiInstance.delete<
    any,
    AxiosResponse<DeleteCoffeeChatResponse>,
    DefaultBodyType
  >(RouteMap.coffeeChat.deleteCoffeeChatPost(postId))

  return res
}

// 커피챗 예약
export async function makeReservation({
  reservation_article_id,
  reservation_id,
  member_id,
  reservation_start_time,
}: MakeReservationRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<MakeReservationResponse>,
    MakeReservationRequest
  >(RouteMap.coffeeChat.coffeeChatReservation, {
    reservation_article_id,
    reservation_id,
    member_id,
    reservation_start_time,
  })

  return res
}

// 커피챗 예약 삭제
export async function deleteCoffeeChatReservation({
  reservationId,
}: DeleteReservationRequest) {
  const res = await apiInstance.delete<
    any,
    AxiosResponse<DeleteCoffeeChatResponse>,
    DefaultBodyType
  >(RouteMap.coffeeChat.deleteCoffeeChatReservation(reservationId))

  return res
}

// 내가 한 커피챗 예약 조회
export async function getMyCoffeeChatReservation() {
  const res = await apiInstance.get<GetMyCoffeeChatReservationListResponse>(
    `${RouteMap.coffeeChat.getMyCoffeeChatReservation}`,
  )

  return res
}

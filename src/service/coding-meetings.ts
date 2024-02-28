import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import type {
  GetCodingMeetingListRequest,
  GetCodingMeetingListResponse,
} from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import type {
  CreateCodingMeetingRequest,
  CreateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { AxiosError, AxiosResponse } from "axios"
import {
  DeleteCodingMeetingRequest,
  DeleteCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/delete-coding-meeting.dto"
import { DefaultBodyType } from "msw"
import { APIResponse } from "@/interfaces/dto/api-response"
import { errorMessage } from "@/constants/message"
import {
  UpdateCodingMeetingRequest,
  UpdateCodingMeetingResponse,
} from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"
import {
  GetCodingMeetingDetailRequest,
  GetCodingMeetingDetailResponse,
} from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"

// 모든 모각코 조회
export async function getCodingMeetingList(
  { page = 0, size = 10, filter = "all" }: GetCodingMeetingListRequest = {
    page: 0,
    size: 10,
    filter: "all",
  },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)
  searchParams.set("filter", filter)

  const res = await apiInstance.get<GetCodingMeetingListResponse>(
    `${RouteMap.codingMeeting.getCodingMeetingList}?${searchParams.toString()}`,
  )

  return res
}

// 특정 모각코 조회
export async function getCodingMeetingDetail({
  coding_meeting_token,
}: GetCodingMeetingDetailRequest) {
  const res = await apiInstance.get<GetCodingMeetingDetailResponse>(
    `${RouteMap.codingMeeting.getCodingMeetingDetail(coding_meeting_token)}`,
  )

  return res
}

// 모각코 생성
export async function createCodingMeeting(
  createPayload: CreateCodingMeetingRequest,
) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateCodingMeetingResponse>,
    CreateCodingMeetingRequest
  >(RouteMap.codingMeeting.createCodingMeeting, {
    ...createPayload,
  })

  return res
}

// 모각코 삭제
export async function deleteCodingMeeting({
  coding_meeting_token,
}: DeleteCodingMeetingRequest) {
  try {
    const res = await apiInstance.delete<
      any,
      AxiosResponse<DeleteCodingMeetingResponse>,
      DefaultBodyType
    >(RouteMap.codingMeeting.deleteCodingMeeting(coding_meeting_token))

    return res
  } catch (err) {
    if (err instanceof AxiosError) {
      const { response } = err as AxiosError<APIResponse>

      console.log({ response: response?.data })
    }
    throw new Error(errorMessage.deleteCodingMeeting)
  }
}

// 모각코 수정
export async function updateCodingMeeting({
  coding_meeting_token,
  ...updatePayload
}: UpdateCodingMeetingRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateCodingMeetingResponse>,
    Omit<UpdateCodingMeetingRequest, "coding_meeting_token">
  >(RouteMap.codingMeeting.updateCodingMeeting(coding_meeting_token), {
    ...updatePayload,
  })

  return res
}

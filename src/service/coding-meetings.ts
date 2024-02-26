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

export async function getCodingMeetingList(
  { page = 0, size = 5 }: GetCodingMeetingListRequest = { page: 0, size: 5 },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)

  const res = await apiInstance.get<GetCodingMeetingListResponse>(
    `${RouteMap.codingMeeting.getCodingMeetingList}?${searchParams.toString()}`,
  )

  return res
}

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

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
  GetCodingMeetingCommentListRequest,
  GetCodingMeetingCommentListResponse,
} from "@/interfaces/dto/coding-meeting/comment/get-coding-meeting-comment-list.dto"
import {
  CreateCodingMeetingCommentRequest,
  CreateCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/create-coding-meeting-comment.dto"
import {
  UpdateCodingMeetingCommentRequest,
  UpdateCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/update-coding-meeting-comment.dto"
import {
  DeleteCodingMeetingCommentRequest,
  DeleteCodingMeetingCommentResponse,
} from "@/interfaces/dto/coding-meeting/comment/delete-coding-meeting-comment.dto"

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

// comment
export async function getCodingMeetingComments({
  coding_meeting_token,
}: GetCodingMeetingCommentListRequest) {
  const res = await apiInstance.get<GetCodingMeetingCommentListResponse>(
    RouteMap.codingMeeting.getCodingMeetingCommentList(coding_meeting_token),
  )

  return res
}

export async function createCodingMeetingComment({
  member_id,
  coding_meeting_comment_token,
  coding_meeting_comment_content,
}: CreateCodingMeetingCommentRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateCodingMeetingCommentResponse>,
    CreateCodingMeetingCommentRequest
  >(RouteMap.codingMeeting.createCodingMeetingComment, {
    member_id,
    coding_meeting_comment_token,
    coding_meeting_comment_content,
  })

  return res
}

export async function updateCodingMeetingComment({
  coding_meeting_comment_token,
  coding_meeting_comment_content,
}: UpdateCodingMeetingCommentRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<UpdateCodingMeetingCommentResponse>,
    Pick<UpdateCodingMeetingCommentRequest, "coding_meeting_comment_content">
  >(
    RouteMap.codingMeeting.updateCodingMeetingComment(
      coding_meeting_comment_token,
    ),
    {
      coding_meeting_comment_content,
    },
  )

  return res
}

export async function deleteCodingMeetingComment({
  coding_meeting_comment_token,
}: DeleteCodingMeetingCommentRequest) {
  const res = await apiInstance.delete<DeleteCodingMeetingCommentResponse>(
    RouteMap.codingMeeting.deleteCodingMeetingComment(
      coding_meeting_comment_token,
    ),
  )

  return res
}

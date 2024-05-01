import { AxiosError, AxiosResponse } from "axios"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import { errorMessage } from "@/constants/message/error"
import type {
  GetQuestionListRequest,
  GetQuestionListResponse,
} from "@/interfaces/dto/question/get-questionlist.dto"
import type {
  GetQuestionRequest,
  GetQuestionResponse,
} from "@/interfaces/dto/question/get-question.dto"
import type {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from "@/interfaces/dto/question/create-question.dto"
import type {
  DeleteQuestionRequest,
  DeleteQuestionResponse,
} from "@/interfaces/dto/question/delete-question.dto"
import type { DefaultBodyType } from "msw"
import type { APIResponse } from "@/interfaces/dto/api-response"
import type {
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from "@/interfaces/dto/question/update-question.dto"

export async function getQuestionList(
  { page = 0, size = 5 }: GetQuestionListRequest = { page: 0, size: 5 },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)

  const res = await apiInstance.get<GetQuestionListResponse>(
    `${RouteMap.question.getQuestionList}?${searchParams.toString()}`,
  )

  return res
}

export async function getQuestion({ id }: GetQuestionRequest) {
  const res = await apiInstance.get<GetQuestionResponse>(
    `${RouteMap.question.getQuestion(id)}`,
  )

  return res
}

export async function createQuestion({
  member_id,
  title,
  content,
  image_url,
  skills,
}: CreateQuestionRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateQuestionResponse>,
    CreateQuestionRequest
  >(RouteMap.question.createQuestion, {
    member_id,
    title,
    content,
    image_url,
    skills: skills ?? [],
  })

  return res
}

export async function deleteQuestion({ questionId }: DeleteQuestionRequest) {
  try {
    const res = await apiInstance.delete<
      any,
      AxiosResponse<DeleteQuestionResponse>,
      DefaultBodyType
    >(RouteMap.question.deleteQuestion(questionId))

    return res
  } catch (err) {
    throw new Error(errorMessage.deleteQuestion)
  }
}

export async function updateQuestion({
  questionId,
  title,
  content,
  image_url,
  skills,
}: UpdateQuestionRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateQuestionResponse>,
    Omit<UpdateQuestionRequest, "questionId">
  >(RouteMap.question.getQuestion(questionId), {
    title,
    content,
    image_url,
    skills: skills ?? [],
  })

  return res
}

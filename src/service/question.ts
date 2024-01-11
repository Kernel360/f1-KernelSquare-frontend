import type {
  GetQuestionListRequest,
  GetQuestionListResponse,
} from "@/interfaces/dto/question/get-questionlist.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import type {
  GetQuestionRequest,
  GetQuestionResponse,
} from "@/interfaces/dto/question/get-question.dto"
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from "@/interfaces/dto/question/create-question.dto"
import { AxiosResponse } from "axios"

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
  console.log("[create question api request]", {
    member_id,
    title,
    content,
    image_url,
    skills,
  })
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateQuestionResponse>,
    CreateQuestionRequest
  >(RouteMap.question.createQuestion, {
    member_id,
    title,
    content,
    image_url,
    skills,
  })

  return res
}

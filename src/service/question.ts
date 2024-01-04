import {
  GetQuestionListRequest,
  GetQuestionListResponse,
} from "@/interfaces/dto/question/get-questionlist.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
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
    skills,
  })

  return res
}

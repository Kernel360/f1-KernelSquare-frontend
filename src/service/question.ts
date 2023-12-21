import {
  GetQuestionListRequest,
  GetQuestionListResponse,
} from "@/interfaces/dto/question/get-questionlist.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"

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

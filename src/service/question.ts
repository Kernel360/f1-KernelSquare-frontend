import { GetQuestionListRequest } from "@/interfaces/dto/question/get-questionlist.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import { APIPagenationResponse } from "@/interfaces/dto/api-response"

export async function getQuestionList({
  page = 0,
  limit = 10,
}: GetQuestionListRequest) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("limit", `${limit}`)

  const res = await apiInstance.get<APIPagenationResponse>(
    `${RouteMap.question.getQuestionList}?${searchParams.toString()}`,
  )

  return res
}

import {
  GetSearchQuestionRequest,
  GetSearchQuestionResponse,
} from "@/interfaces/dto/search/search-questions.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"

export async function getSearchQuestions(
  { page = 0, size = 5, keyword = "" }: GetSearchQuestionRequest = {
    page: 0,
    size: 5,
    keyword: "",
  },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)
  searchParams.set("keyword", keyword)

  const res = await apiInstance.get<GetSearchQuestionResponse>(
    `${RouteMap.search.getSearchQuestions}?${searchParams.toString()}`,
  )

  return res
}

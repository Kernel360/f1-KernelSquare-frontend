import {
  GetTechTagsRequest,
  GetTechTagsResponse,
} from "@/interfaces/dto/techs/get-tech-tags.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import {
  SearchTechTagRequest,
  SearchTechTagResponse,
} from "@/interfaces/dto/techs/search-tech-tag.dto"

export async function getTechTags(
  { page = 0, size = 10 }: GetTechTagsRequest = { page: 0, size: 10 },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)

  const res = await apiInstance.get<GetTechTagsResponse>(
    `${RouteMap.techTags.getTechTags}?${searchParams.toString()}`,
  )

  return res
}

export async function searchTags(
  { page = 0, size = 10, keyword = "" }: SearchTechTagRequest = {
    page: 0,
    size: 10,
    keyword: "",
  },
) {
  const searchParams = new URLSearchParams()
  searchParams.set("page", `${page}`)
  searchParams.set("size", `${size}`)
  searchParams.set("keyword", keyword ?? "")

  const res = await apiInstance.get<SearchTechTagResponse>(
    `${RouteMap.techTags.searchTechTag}?${searchParams.toString()}`,
  )

  return res
}

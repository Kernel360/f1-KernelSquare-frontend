import { techTagList } from "@/constants/editor"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import type { GetTechTagsResponse } from "@/interfaces/dto/techs/get-tech-tags.dto"
import type { SearchTechTagResponse } from "@/interfaces/dto/techs/search-tech-tag.dto"

export const techTagsHandler = [
  http.get<PathParams, DefaultBodyType, GetTechTagsResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.techTags.getTechTags}`,
    ({ request }) => {
      const url = new URL(request.url)

      const page = Number(url.searchParams.get("page"))
      const perPage = Number(url.searchParams.get("size"))

      const { pages, maximumPage } = generatePagination<string>(techTagList, {
        perPage,
      })

      const pagePayload = pages[page] ?? []

      return HttpResponse.json(
        {
          code: 2347,
          msg: "기술 스택 모든 조회 성공",
          data: {
            pagination: {
              total_page: maximumPage,
              pageable: pagePayload.length,
              is_end: page === maximumPage - 1,
            },
            list: [...pagePayload],
          },
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
  http.get<PathParams, DefaultBodyType, SearchTechTagResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.techTags.searchTechTag}`,
    ({ request }) => {
      const url = new URL(request.url)

      const page = Number(url.searchParams.get("page"))
      const perPage = Number(url.searchParams.get("size"))
      const keyword = url.searchParams.get("keyword")

      const searchTag = ({
        keyword,
        tag,
      }: {
        keyword: string
        tag: string
      }) => {
        const regExp = new RegExp(`${keyword}`, "gi")

        return regExp.test(tag)
      }

      const targetList = !keyword
        ? techTagList
        : techTagList.filter((tag) => {
            return searchTag({ keyword, tag })
          })

      const { totalItemsCount, maximumPage, pages } =
        generatePagination<string>(targetList, { perPage })

      const pagePayload = pages[page] ?? []

      return HttpResponse.json(
        {
          code: 2541,
          msg: "기술 스택 검색 성공",
          data: {
            total_count: totalItemsCount,
            pagination: {
              total_page: maximumPage,
              pageable: pagePayload.length,
              is_end: page === maximumPage - 1,
            },
            tech_stack_list: [...pagePayload],
          },
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
]

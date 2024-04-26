import { techTagList } from "@/constants/editor"
import { SearchTechTagResponse } from "@/interfaces/dto/techs/search-tech-tag.dto"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockSearchTechTagApi = http.get<
  PathParams,
  DefaultBodyType,
  SearchTechTagResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.techTags.searchTechTag}`,
  ({ request }) => {
    const url = new URL(request.url)

    const page = Number(url.searchParams.get("page"))
    const perPage = Number(url.searchParams.get("size"))
    const keyword = url.searchParams.get("keyword")

    const searchTag = ({ keyword, tag }: { keyword: string; tag: string }) => {
      const regExp = new RegExp(`${keyword}`, "gi")

      return regExp.test(tag)
    }

    const targetList = !keyword
      ? techTagList
      : techTagList.filter((tag) => {
          return searchTag({ keyword, tag })
        })

    const { totalItemsCount, maximumPage, pages } = generatePagination<string>(
      targetList,
      { perPage },
    )

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
)

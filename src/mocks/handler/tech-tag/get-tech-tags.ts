import { techTagList } from "@/constants/editor"
import { GetTechTagsResponse } from "@/interfaces/dto/techs/get-tech-tags.dto"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockGetTechTagsApi = http.get<
  PathParams,
  DefaultBodyType,
  GetTechTagsResponse
>(
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
)

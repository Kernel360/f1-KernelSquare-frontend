import { ApiStatus } from "@/constants/response/api"
import { BaseCodingMeeting } from "@/interfaces/coding-meetings"
import {
  CodingMeetingListFilter,
  GetCodingMeetingListResponse,
} from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import mockCodingMeetings from "@/mocks/db/coding-meetings"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockGetCodingMeetingListApi = http.get<
  PathParams,
  DefaultBodyType,
  GetCodingMeetingListResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.codingMeeting.getCodingMeetingList}`,
  async ({ request }) => {
    try {
      const url = new URL(request.url)

      const page = Number(url.searchParams.get("page"))
      const perPage = Number(url.searchParams.get("size"))

      const filter = url.searchParams.get(
        "filter",
      ) as CodingMeetingListFilter | null

      const invalidQueries = []

      // page는 0부터 시작
      if (page < 0 || Number.isNaN(page)) invalidQueries.push("page")
      if (perPage <= 0 || Number.isNaN(perPage)) invalidQueries.push("size")
      if (
        filter &&
        filter !== "all" &&
        filter !== "open" &&
        filter !== "closed"
      ) {
        invalidQueries.push("filter")
      }

      if (invalidQueries.length) {
        const { Code, HttpStatus } =
          ApiStatus.CodingMeetings.getCodingMeetingList.BadRequest

        return HttpResponse.json(
          { code: Code, msg: "잘못된 요청입니다" },
          { status: HttpStatus },
        )
      }

      // 20페이지 이상의 페이지네이션 테스트 목적
      const targetList = [
        ...mockCodingMeetings.map((mockReservation) => {
          const { ...reservation } = mockReservation

          return { ...reservation }
        }),
        ...Array.from({ length: 200 }).map((_, index) => {
          const target = { ...mockCodingMeetings[0] }

          target.coding_meeting_token = "TMT" + (10000 + index)

          return target
        }),
      ].filter(({ coding_meeting_closed }) => {
        if (!filter || filter === "all") {
          return true
        }
        if (filter === "open") return coding_meeting_closed === false
        if (filter === "closed") return coding_meeting_closed === true

        return true
      })

      const { pages, maximumPage } = generatePagination<BaseCodingMeeting>(
        targetList,
        { perPage: 10 },
      )

      const pagePayload = pages[page] ?? []

      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.getCodingMeetingList.Ok

      if (mockCodingMeetings.length && !pagePayload?.length) {
        return HttpResponse.json(
          {
            code: Code,
            msg: "모각코 전체 조회 성공",
            data: {
              pagination: {
                total_page: 0,
                pageable: 10,
                is_end: false,
              },
              list: [],
            },
          },
          { status: HttpStatus },
        )
      }

      return HttpResponse.json(
        {
          code: Code,
          msg: "모각코 전체 조회 성공",
          data: {
            pagination: {
              total_page: maximumPage,
              pageable: pagePayload.length,
              is_end: page === maximumPage - 1,
            },
            list: [...pagePayload],
          },
        },
        { status: HttpStatus },
      )
    } catch (error) {
      const { Code, HttpStatus } =
        ApiStatus.CodingMeetings.getCodingMeetingList.InternalServerError

      return HttpResponse.json(
        {
          code: Code,
          msg: "서버 오류",
        },
        { status: HttpStatus },
      )
    }
  },
)

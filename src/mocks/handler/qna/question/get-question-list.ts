import { ApiStatus } from "@/constants/response/api"
import { GetQuestionListResponse } from "@/interfaces/dto/question/get-questionlist.dto"
import { Question } from "@/interfaces/question"
import { mockQuestions } from "@/mocks/db/questions"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { generatePagination } from "@/util/paginate"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockGetQuestionListApi = http.get<
  PathParams,
  DefaultBodyType,
  GetQuestionListResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.getQuestionList}`,
  ({ request }) => {
    try {
      const url = new URL(request.url)

      const page = Number(url.searchParams.get("page"))
      const perPage = Number(url.searchParams.get("size"))

      const invalidQueries = []

      // page는 0부터 시작
      if (page < 0 || Number.isNaN(page)) invalidQueries.push("page")
      if (perPage <= 0 || Number.isNaN(perPage)) invalidQueries.push("size")

      if (invalidQueries.length) {
        const { Code, HttpStatus } = ApiStatus.QnA.getAllQuestions.BadRequest

        return HttpResponse.json(
          { code: Code, msg: "잘못된 요청입니다" },
          { status: HttpStatus },
        )
      }

      const { pages, maximumPage } = generatePagination<
        Question & { member_id: number }
      >(
        mockQuestions.map((question) => {
          const member_id = mockUsers.find(
            (user) => user.nickname === question.nickname,
          )!.id

          return { ...question, member_id }
        }),
        { perPage },
      )

      const pagePayload = pages[page] ?? []

      if (mockQuestions.length && !pagePayload?.length) {
        const { Code, HttpStatus } = ApiStatus.QnA.getAllQuestions.NotFound

        return HttpResponse.json(
          {
            code: Code,
            msg: "존재하지 않는 페이지",
          },
          {
            status: HttpStatus,
          },
        )
      }

      const { Code, HttpStatus } = ApiStatus.QnA.getAllQuestions.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "모든 질문 조회 성공",
          data: {
            pagination: {
              total_page: maximumPage,
              pageable: pagePayload.length,
              is_end: page === maximumPage - 1,
            },
            list: [...pagePayload],
          },
        },
        {
          status: HttpStatus,
        },
      )
    } catch (error) {
      const { Code, HttpStatus } =
        ApiStatus.QnA.getAllQuestions.InternalServerError

      return HttpResponse.json(
        {
          code: Code,
          msg: "서버 오류",
        },
        {
          status: HttpStatus,
        },
      )
    }
  },
)

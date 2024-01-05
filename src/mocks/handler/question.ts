import type { GetQuestionListResponse } from "@/interfaces/dto/question/get-questionlist.dto"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import { mockQuestions } from "../db/questions"
import { Question } from "@/interfaces/question"
import { generatePagination } from "@/util/paginate"
import type { GetQuestionResponse } from "@/interfaces/dto/question/get-question.dto"
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from "@/interfaces/dto/question/create-question.dto"
import { mockUsers } from "../db/user"
import dayjs from "dayjs"
import { TechTag } from "@/interfaces/tech-tag"
import badge_url from "@/assets/images/badges"

export const questionHandler = [
  http.get<PathParams, DefaultBodyType, GetQuestionListResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.getQuestionList}`,
    ({ request }) => {
      const url = new URL(request.url)

      const page = Number(url.searchParams.get("page"))
      const perPage = Number(url.searchParams.get("size"))

      const invalidQueries = []

      // page는 0부터 시작
      if (page < 0 || Number.isNaN(page)) invalidQueries.push("page")
      if (perPage <= 0 || Number.isNaN(perPage)) invalidQueries.push("size")

      if (invalidQueries.length) {
        return HttpResponse.json(
          { code: HttpStatusCode.BadRequest, msg: "잘못된 요청입니다" },
          { status: HttpStatusCode.BadRequest },
        )
      }

      const { pages, maximumPage } = generatePagination<Question>(
        mockQuestions,
        { perPage },
      )

      const pagePayload = pages[page] ?? []

      return HttpResponse.json(
        {
          code: HttpStatusCode.Ok,
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
          status: HttpStatusCode.Ok,
        },
      )
    },
  ),
  http.get<{ id: string }, DefaultBodyType, GetQuestionResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.getQuestion()}`,
    ({ params }) => {
      // 특정 질문 조회
      const questionId = params.id

      const existMockQuestion = mockQuestions.find(
        (question) => question.id === Number(questionId),
      )!

      if (!existMockQuestion)
        return HttpResponse.json(
          {
            code: HttpStatusCode.InternalServerError,
            msg: "존재하지 않는 질문",
          },
          { status: HttpStatusCode.InternalServerError },
        )

      return HttpResponse.json(
        {
          code: 2141,
          msg: "질문 조회 성공",
          data: {
            ...existMockQuestion,
          },
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
  http.post<PathParams, CreateQuestionRequest, CreateQuestionResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.createQuestion}`,
    async ({ request }) => {
      const { member_id, title, content, image_url, skills } =
        await request.json()

      const inValidQueries = []

      if (member_id === undefined || (member_id && member_id < 0)) {
        inValidQueries.push("memberId")
      }
      if (!title) {
        inValidQueries.push("title")
      }
      if (!content) {
        inValidQueries.push("content")
      }

      if (inValidQueries.length) {
        return HttpResponse.json(
          {
            code: 1201,
            msg: "잘못된 요청입니다",
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        )
      }

      const id = createMockQuestion({
        title,
        content,
        member_id,
        image_url,
        skills,
      })

      return HttpResponse.json(
        {
          code: 2140,
          msg: "질문 생성 성공",
          data: id,
        },
        {
          status: HttpStatusCode.Created,
          statusText: mockQuestions.toString(),
        },
      )
    },
  ),
]

export function createMockQuestion({
  member_id,
  title,
  content,
  image_url,
  skills,
}: {
  member_id: number
  title: string
  content: string
  skills: Array<TechTag>
  image_url?: string
}) {
  const latestId = Math.max(...mockQuestions.map((question) => question.id))

  const createdDate = new Date()

  const user = mockUsers.find((user) => user.id === member_id)

  mockQuestions.splice(0, 0, {
    id: latestId + 1,
    title,
    content,
    question_image_url: image_url ?? "",
    member_image_url: user?.image_url ?? "",
    view_count: 0,
    nickname: user!.nickname,
    skills,
    close_status: false,
    created_date: dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss"),
    modified_date: dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss"),
    level: user!.level,
    level_image_url: badge_url[user!.level],
    list: [],
  })

  return latestId + 1
}

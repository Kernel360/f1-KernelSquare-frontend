import type { GetQuestionListResponse } from "@/interfaces/dto/question/get-questionlist.dto"
import { RouteMap } from "@/service/route-map"
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
import { ApiStatus } from "@/constants/response/api"
import {
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from "@/interfaces/dto/question/update-question.dto"

export const questionHandler = [
  http.get<PathParams, DefaultBodyType, GetQuestionListResponse>(
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
  ),
  http.get<{ id: string }, DefaultBodyType, GetQuestionResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.getQuestion()}`,
    ({ params }) => {
      // 특정 질문 조회
      try {
        const questionId = params.id

        if (!questionId || Number.isNaN(Number(questionId))) {
          const { Code, HttpStatus } = ApiStatus.QnA.getQuestion.BadRequest

          return HttpResponse.json(
            {
              code: Code,
              msg: "잘못된 요청입니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const existMockQuestion = mockQuestions.find(
          (question) => question.id === Number(questionId),
        )!

        if (!existMockQuestion) {
          const { Code, HttpStatus } = ApiStatus.QnA.getQuestion.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "존재하지 않는 질문",
            },
            { status: HttpStatus },
          )
        }

        const { Code, HttpStatus } = ApiStatus.QnA.getQuestion.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "질문 조회 성공",
            data: {
              ...existMockQuestion,
            },
          },
          { status: HttpStatus },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.QnA.getQuestion.InternalServerError

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
  ),
  http.post<PathParams, CreateQuestionRequest, CreateQuestionResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.createQuestion}`,
    async ({ request }) => {
      try {
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
          const { Code, HttpStatus } = ApiStatus.QnA.createQuestion.BadRequest

          return HttpResponse.json(
            {
              code: Code,
              msg: "잘못된 요청입니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        if (!mockUsers.find((mockUser) => mockUser.id === member_id)) {
          const { Code, HttpStatus } = ApiStatus.QnA.createQuestion.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "존재하지 않는 회원입니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const { Code, HttpStatus } = ApiStatus.QnA.createQuestion.Ok

        const id = createMockQuestion({
          title,
          content,
          member_id,
          image_url,
          skills,
        })

        return HttpResponse.json(
          {
            code: Code,
            msg: "질문 생성 성공",
            data: {
              question_id: id,
            },
          },
          {
            status: HttpStatus,
          },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.QnA.createQuestion.InternalServerError

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
  ),
  http.put<
    { id: string },
    Omit<UpdateQuestionRequest, "questionId">,
    UpdateQuestionResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.updateQuestion()}`,
    async ({ params, request }) => {
      try {
        const header = request.headers
        const token = header.get("Authorization")

        if (!token) {
          const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.Unauthorized
          return HttpResponse.json(
            {
              code: Code,
              msg: "인증된 유저가 아닙니다",
            },
            { status: HttpStatus },
          )
        }

        const targetQuestionId = Number(params.id)

        const { title, content, image_url, skills } = await request.json()

        const targetMockQuestionId = mockQuestions.findIndex(
          (mockQuestion) => mockQuestion.id === targetQuestionId,
        )

        if (targetMockQuestionId < 0) {
          const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "존재하지 않는 질문",
            },
            { status: HttpStatus },
          )
        }

        const { Code, HttpStatus } = ApiStatus.QnA.updateQustion.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "질문 수정 성공",
          },
          { status: HttpStatus },
        )
      } catch (error) {
        const { Code, HttpStatus } =
          ApiStatus.QnA.updateQustion.InternalServerError

        return HttpResponse.json(
          {
            code: Code,
            msg: "서버 오류",
          },
          { status: HttpStatus },
        )
      }
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
  image_url?: string | null
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

export function updateMockQuestion({
  questionId,
  title,
  content,
  image_url,
  skills,
}: UpdateQuestionRequest) {
  const targetIndex = mockQuestions.findIndex(
    (mockQuestion) => mockQuestion.id === questionId,
  )

  const targetMockQuestion = mockQuestions[targetIndex]

  targetMockQuestion.title = title
  targetMockQuestion.content = content
  targetMockQuestion.question_image_url = image_url || ""
  targetMockQuestion.skills = skills
}

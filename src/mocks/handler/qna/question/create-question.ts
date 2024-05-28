import { ApiStatus } from "@/constants/response/api"
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from "@/interfaces/dto/question/create-question.dto"
import { mockUsers } from "@/mocks/db/user"
import { createMockQuestion } from "@/mocks/util/mock-question"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, PathParams, http } from "msw"

export const mockCreateQuestionApi = http.post<
  PathParams,
  CreateQuestionRequest,
  CreateQuestionResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.createQuestion}`,
  async ({ request }) => {
    try {
      const header = request.headers
      const authHeader = header.get("Authorization")

      if (!authHeader) {
        return HttpResponse.json(
          {
            code: -1,
            msg: "인증되지 않은 유저입니다",
          },
          { status: HttpStatusCode.Unauthorized },
        )
      }

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
)

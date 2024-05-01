import { ApiStatus } from "@/constants/response/api"
import {
  UpdateQuestionRequest,
  UpdateQuestionResponse,
} from "@/interfaces/dto/question/update-question.dto"
import { mockQuestions } from "@/mocks/db/questions"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, http } from "msw"

export const mockUpdateQuestionApi = http.put<
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
)

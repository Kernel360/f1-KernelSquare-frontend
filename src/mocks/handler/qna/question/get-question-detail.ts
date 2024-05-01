import { ApiStatus } from "@/constants/response/api"
import { GetQuestionResponse } from "@/interfaces/dto/question/get-question.dto"
import { mockQuestions } from "@/mocks/db/questions"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockGetQuestionDetailApi = http.get<
  { id: string },
  DefaultBodyType,
  GetQuestionResponse
>(
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
      const { Code, HttpStatus } = ApiStatus.QnA.getQuestion.InternalServerError

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

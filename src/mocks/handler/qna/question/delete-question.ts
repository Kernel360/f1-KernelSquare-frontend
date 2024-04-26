import { DeleteQuestionResponse } from "@/interfaces/dto/question/delete-question.dto"
import { mockQuestions } from "@/mocks/db/questions"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockDeleteQuestionApi = http.delete<
  { id: string },
  DefaultBodyType,
  DeleteQuestionResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.question.deleteQuestion()}`,
  async ({ params }) => {
    const questionId = Number(params.id)

    const targetQuestion = mockQuestions.findIndex(
      (question) => question.id === questionId,
    )

    mockQuestions.splice(targetQuestion, 1)

    return HttpResponse.json(
      {
        code: 2144,
        msg: "질문 삭제 성공",
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  },
)

import {
  GetAnswerRequest,
  GetAnswerResponse,
} from "@/interfaces/dto/answer/get-answerlist.dto"
import mockAnswers from "@/mocks/db/answers"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockGetAnswerApi = http.get<
  { id: string },
  GetAnswerRequest,
  GetAnswerResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.getAnswer()}`,
  ({ params }) => {
    const questionId = Number(params.id)

    const targetAnswers = mockAnswers.filter(
      (answer) => answer.question_id === questionId,
    )

    if (!targetAnswers)
      return HttpResponse.json(
        {
          code: HttpStatusCode.NotFound,
          msg: "존재하지 않는 질문입니다.",
        },
        { status: HttpStatusCode.NotFound },
      )

    return HttpResponse.json(
      {
        code: 2151,
        msg: "질문에 대한 모든 답변 조회 성공",
        data: {
          answer_responses: [...targetAnswers],
        },
      },
      { status: HttpStatusCode.Ok },
    )
  },
)

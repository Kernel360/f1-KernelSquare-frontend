import { DeleteAnswerResponse } from "@/interfaces/dto/answer/delete-answer.dto"
import mockAnswers from "@/mocks/db/answers"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, http } from "msw"

export const mockDeleteAnswerApi = http.delete<
  { id: string },
  DefaultBodyType,
  DeleteAnswerResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.updateAnswer()}`,
  async ({ params }) => {
    const answerId = Number(params.id)

    const targetAnswer = mockAnswers.findIndex(
      (answer) => answer.answer_id === answerId,
    )

    mockAnswers.splice(targetAnswer, 1)

    return HttpResponse.json(
      {
        code: 2150,
        msg: "답변 삭제 성공",
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  },
)

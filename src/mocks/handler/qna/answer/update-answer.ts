import {
  UpdateAnswerRequest,
  UpdateAnswerResponse,
} from "@/interfaces/dto/answer/update-answer.dto"
import mockAnswers from "@/mocks/db/answers"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockUpdateAnswerApi = http.put<
  { id: string },
  Omit<UpdateAnswerRequest, "answerId">,
  UpdateAnswerResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.updateAnswer()}`,
  async ({ request, params }) => {
    const answerId = Number(params.id)

    const { content, image_url } = await request.json()

    const targetAnswer = mockAnswers.find(
      (mockAnswer) => mockAnswer.answer_id === answerId,
    )

    if (targetAnswer) {
      targetAnswer.content = content
      targetAnswer.answer_image_url = image_url
      targetAnswer.modified_date = new Date().toISOString()
    }

    return HttpResponse.json(
      {
        code: 2150,
        msg: "답변 수정 성공",
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  },
)

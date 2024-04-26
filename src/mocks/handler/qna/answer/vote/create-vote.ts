import {
  CreateVoteRequest,
  CreateVoteResponse,
} from "@/interfaces/dto/answer/create-vote.dto"
import mockAnswers from "@/mocks/db/answers"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockCreateVoteApi = http.post<
  { id: string },
  CreateVoteRequest,
  CreateVoteResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.voteAnswer()}`,
  async ({ request, params }) => {
    const answerId = Number(params.id)
    try {
      const { status } = await request.json()

      // 질문 목록에서
      const targetAnswer = mockAnswers.find(
        (answer) => answer.answer_id === answerId,
      )
      if (!targetAnswer)
        return HttpResponse.json(
          {
            code: 500,
            msg: "해당 답변이 존재하지 않습니다.",
          },
          {
            status: HttpStatusCode.InternalServerError,
          },
        )

      targetAnswer.vote_count += status
      targetAnswer.vote_status = status

      return HttpResponse.json(
        {
          code: 2244,
          msg: "투표 생성 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    } catch (err) {
      return HttpResponse.json(
        {
          code: 500,
          msg: "투표 생성 실패",
        },
        {
          status: HttpStatusCode.InternalServerError,
        },
      )
    }
  },
)

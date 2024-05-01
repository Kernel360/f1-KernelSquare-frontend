import { VoteStatus } from "@/interfaces/answer"
import {
  DeleteVoteRequest,
  DeleteVoteResponse,
} from "@/interfaces/dto/answer/delete-vote.dto"
import mockAnswers from "@/mocks/db/answers"
import { RouteMap } from "@/service/route-map"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockDeleteVoteApi = http.delete<
  { id: string },
  DeleteVoteRequest,
  DeleteVoteResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.voteAnswer()}`,
  async ({ params }) => {
    const answerId = Number(params.id)
    try {
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

      if (targetAnswer.vote_status === VoteStatus.LIKED)
        targetAnswer.vote_count--
      if (targetAnswer.vote_status === VoteStatus.DISLIKED)
        targetAnswer.vote_count++
      targetAnswer.vote_status = VoteStatus.NONE

      return HttpResponse.json(
        {
          code: 2245,
          msg: "투표 삭제 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
    } catch (err) {
      return HttpResponse.json(
        {
          code: 500,
          msg: "투표 삭제 실패",
        },
        {
          status: HttpStatusCode.InternalServerError,
        },
      )
    }
  },
)

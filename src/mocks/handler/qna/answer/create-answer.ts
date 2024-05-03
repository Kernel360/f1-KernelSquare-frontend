import { Answer } from "@/interfaces/answer"
import {
  CreateAnswerRequest,
  CreateAnswerResponse,
} from "@/interfaces/dto/answer/create-answer.dto"
import { ALERT_TYPE } from "@/interfaces/sse"
import mockAnswers from "@/mocks/db/answers"
import { mockQuestions } from "@/mocks/db/questions"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { mockSSENotification } from "@/service/sse"
import { getNow } from "@/util/getDate"
import { HttpStatusCode } from "axios"
import { HttpResponse, http } from "msw"

export const mockCreateAnswerApi = http.post<
  { id: string },
  Omit<CreateAnswerRequest, "questionId">,
  CreateAnswerResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.createAnswer()}`,
  async ({ request, params }) => {
    const header = request.headers
    const token = header.get("Authorization")

    if (!token) {
      return HttpResponse.json(
        {
          code: -1,
          msg: "인증되지 않은 유저입니다.",
        },
        { status: HttpStatusCode.Unauthorized },
      )
    }

    const questionId = Number(params.id)

    const { member_id, content, image_url } = await request.json()

    const targetQuestion = mockQuestions.find(
      (question) => question.id === questionId,
    )
    const targetMember = mockUsers.find((member) => member.id === member_id)

    if (!targetMember) {
      return HttpResponse.json(
        {
          code: 2121,
          msg: "답변을 입력할 권한이 없습니다.",
        },
        {
          status: HttpStatusCode.Forbidden,
        },
      )
    }

    const newAnswer: Answer = {
      answer_id: Math.max(...mockAnswers.map((answer) => answer.answer_id)) + 1,
      question_id: questionId,
      answer_member_id: targetMember.id,
      content,
      author_level: targetMember.level,
      rank_image_url: null,
      rank_name: undefined,
      member_image_url: targetMember.image_url,
      member_nickname: targetMember.nickname,
      answer_image_url: image_url ? image_url : "",
      created_date: getNow(),
      modified_date: getNow(),
      vote_count: 0,
      vote_status: 0,
    }

    mockAnswers.unshift(newAnswer)

    mockSSENotification<ALERT_TYPE.QUESTION_REPLY>({
      targetUserId: targetQuestion!.member_id,
      message: {
        alert_type: "QUESTION_REPLY",
        id: `${Date.now()}`,
        recipient: targetQuestion!.nickname,
        send_time: new Date().toISOString(),
        payload: {
          questionId,
          questionTitle: targetQuestion!.title,
          sender: targetMember.nickname,
        },
      },
    })

    return HttpResponse.json(
      {
        code: 2150,
        msg: "답변 생성 성공",
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  },
)

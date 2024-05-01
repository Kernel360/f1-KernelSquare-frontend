import badge_url from "@/assets/images/badges"
import { AnswerApiStatus } from "@/constants/response/answer"
import { Answer } from "@/interfaces/answer"
import {
  CreateAIAutoAnswerRequest,
  CreateAIAutoAnswerResponse,
} from "@/interfaces/dto/answer/create-AI-auto-answer"
import mockAnswers from "@/mocks/db/answers"
import { mockQuestions } from "@/mocks/db/questions"
import { mockUsers } from "@/mocks/db/user"
import { RouteMap } from "@/service/route-map"
import { getNow } from "@/util/getDate"
import { HttpResponse, http } from "msw"

export const mockCreateAiAnswerApi = http.post<
  { id: string },
  Omit<CreateAIAutoAnswerRequest, "questionId">,
  CreateAIAutoAnswerResponse
>(
  `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.createAIAutoAnswer()}`,
  async ({ request, params }) => {
    try {
      const questionId = Number(params.id)
      // 질문 목록에서
      const targetQuestion = mockQuestions.find(
        (question) => question.id === questionId,
      )

      if (!targetQuestion)
        return HttpResponse.json(
          {
            code: AnswerApiStatus.createAIAutoResponse.invalidQuestion.Code,
            msg: "해당 질문이 존재하지 않습니다.",
          },
          {
            status:
              AnswerApiStatus.createAIAutoResponse.invalidQuestion.HttpStatus,
          },
        )

      const newAnswer: Answer = {
        answer_id: targetQuestion
          ? targetQuestion.list.length + 1
          : Math.random() * 1000,
        question_id: questionId,
        answer_member_id: mockUsers[mockUsers.length - 1].id,
        content: "AI 인턴의 답변입니다.",
        author_level: mockUsers[mockUsers.length - 1].level,
        rank_image_url: badge_url[mockUsers[mockUsers.length - 1].level],
        rank_name: mockUsers[mockUsers.length - 1].level,
        member_image_url: mockUsers[mockUsers.length - 1].image_url,
        member_nickname: mockUsers[mockUsers.length - 1].nickname,
        answer_image_url: mockUsers[mockUsers.length - 1].image_url ?? "",
        created_date: getNow(),
        modified_date: getNow(),
        vote_count: 0,
        vote_status: 0,
      }

      mockAnswers.unshift(newAnswer)

      return HttpResponse.json(
        {
          code: AnswerApiStatus.createAIAutoResponse.Ok.Code,
          msg: "커널스퀘어 AI 인턴 답변 성공",
        },
        {
          status: AnswerApiStatus.createAIAutoResponse.Ok.HttpStatus,
        },
      )
    } catch (err) {
      return HttpResponse.json(
        {
          code: 500,
          msg: "커널스퀘어 AI 인턴 답변 실패",
        },
        {
          status:
            AnswerApiStatus.createAIAutoResponse.InternalServerError.HttpStatus,
        },
      )
    }
  },
)

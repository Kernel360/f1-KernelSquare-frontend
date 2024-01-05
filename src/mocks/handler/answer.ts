import type {
  CreateAnswerRequest,
  CreateAnswerResponse,
} from "@/interfaces/dto/answer/create-answer.dto"
import { RouteMap } from "@/service/route-map"
import { HttpResponse, http } from "msw"
import { mockQuestions } from "../db/questions"
import { mockUsers } from "../db/user"
import { getNow } from "@/util/getDate"
import { HttpStatusCode } from "axios"
import {
  UpdateAnswerRequest,
  UpdateAnswerResponse,
} from "@/interfaces/dto/answer/update-answer.dto"
import mockAnswers from "../db/answers"
import { useUser } from "@/hooks/useUser"
import {
  CreateVoteRequest,
  CreateVoteResponse,
} from "@/interfaces/dto/answer/create-vote.dto"
import type {
  GetAnswerRequest,
  GetAnswerResponse,
} from "@/interfaces/dto/answer/get-answerlist.dto"

export const answerHandler = [
  // 특정 질문 답변 조회
  http.get<{ id: string }, GetAnswerRequest, GetAnswerResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.getAnswer()}`,
    ({ params }) => {
      const questionId = Number(params.id)

      const existMockAnswers = mockAnswers.filter(
        (answer) => answer.question_id === questionId,
      )

      if (!existMockAnswers)
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
          data: [...existMockAnswers],
        },
        { status: HttpStatusCode.Ok },
      )
    },
  ),
  // 답변 생성
  http.post<
    { id: string },
    Omit<CreateAnswerRequest, "questionId">,
    CreateAnswerResponse
  >(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.createAnswer()}`,
    async ({ request, params }) => {
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

      const newAnswer = {
        answer_id: targetQuestion
          ? targetQuestion.list.length + 2
          : Math.random() * 1000,
        question_id: questionId,
        content,
        author_level: 1,
        rank_image_url: "",
        member_image_url:
          "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
        created_by: targetMember.nickname,
        answer_image_url: image_url ? image_url : "",
        created_date: getNow(),
        modified_date: getNow(),
        vote_count: 0,
        vote_yn: false,
      }

      targetQuestion?.list.push(newAnswer)
      mockAnswers.push(newAnswer)

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
  ),
  // 답변 수정
  http.put<{ id: string }, UpdateAnswerRequest, UpdateAnswerResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.updateAnswer()}`,
    async ({ request, params }) => {
      const answerId = Number(params.id)

      const { content, image_url } = await request.json()

      // 답변 목록에서
      const targetAnswer = mockAnswers.find(
        (answer) => answer.answer_id === answerId,
      )!
      // 질문 목록에서
      const targetQuestion = mockQuestions.find((question) =>
        question.list.some((answer) => answer.answer_id === answerId),
      )!

      const { data: targetMember } = useUser()

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

      targetAnswer.content = content
      if (image_url) targetAnswer.answer_image_url = image_url

      const targetInQuestoinList = targetQuestion.list.find(
        (answer) => answer.answer_id === answerId,
      )!
      targetInQuestoinList.content = content
      if (image_url) targetInQuestoinList.answer_image_url = image_url

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
  ),
  // 답변 투표 생성
  http.post<{ id: string }, CreateVoteRequest, CreateVoteResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.voteAnswer()}`,
    async ({ request, params }) => {
      const answerId = Number(params.id)
      console.log("mock", mockAnswers, mockQuestions)
      try {
        const { member_id, status } = await request.json()
        console.log(answerId, member_id, status)

        // 답변 목록에서
        const targetAnswer = mockAnswers.find(
          (answer) => answer.answer_id === answerId,
        )
        // 질문 목록에서
        const targetQuestion = mockQuestions.find((question) =>
          question.list.some((answer) => answer.answer_id === answerId),
        )

        // const targetMember = mockUsers.find((member) => member.id === member_id)

        if (!targetQuestion)
          return HttpResponse.json(
            {
              code: 500,
              msg: "해당 질문이 존재하지 않습니다.",
            },
            {
              status: HttpStatusCode.InternalServerError,
            },
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

        const targetInQuestoinList = targetQuestion.list.find(
          (answer) => answer.answer_id === answerId,
        )!
        targetInQuestoinList.vote_count += status

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
        console.log(`%cError`, `background:red; color:#fff`)
        console.log({ err })
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
  ),
]

import type {
  CreateAnswerRequest,
  CreateAnswerResponse,
} from "@/interfaces/dto/answer/create-answer.dto"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, http } from "msw"
import { mockQuestions } from "../db/questions"
import { mockUsers } from "../db/user"
import { getNow } from "@/util/getDate"
import axios, { HttpStatusCode } from "axios"
import {
  UpdateAnswerRequest,
  UpdateAnswerResponse,
} from "@/interfaces/dto/answer/update-answer.dto"
import mockAnswers from "../db/answers"
import {
  CreateVoteRequest,
  CreateVoteResponse,
} from "@/interfaces/dto/answer/create-vote.dto"
import type {
  GetAnswerRequest,
  GetAnswerResponse,
} from "@/interfaces/dto/answer/get-answerlist.dto"
import { DeleteAnswerResponse } from "@/interfaces/dto/answer/delete-answer.dto"
import badge_url from "@/assets/images/badges"
import type { Answer } from "@/interfaces/answer"
import {
  DeleteVoteRequest,
  DeleteVoteResponse,
} from "@/interfaces/dto/answer/delete-vote.dto"
import { sleep } from "@/util/sleep"
import { AnswerApiStatus } from "@/constants/response/answer"
import {
  CreateAIAutoAnswerRequest,
  CreateAIAutoAnswerResponse,
} from "@/interfaces/dto/answer/create-AI-auto-answer"
import { mockSSENotification } from "@/service/sse"
import { ALERT_TYPE } from "@/interfaces/sse"

export const answerHandler = [
  // 특정 질문 답변 조회
  http.get<{ id: string }, GetAnswerRequest, GetAnswerResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.answer.getAnswer()}`,
    ({ params }) => {
      // Todo: 에러 상황 발생하게 해서 확인해보기
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

      const newAnswer: Answer = {
        answer_id: targetQuestion
          ? targetQuestion.list.length + 1
          : Math.random() * 1000,
        question_id: questionId,
        answer_member_id: 1,
        content,
        author_level: 1,
        rank_image_url: badge_url[1],
        rank_name: 1,
        member_image_url:
          "https://mobirise.com/bootstrap-template//profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg",
        member_nickname: targetMember.nickname,
        answer_image_url: image_url ? image_url : "",
        created_date: getNow(),
        modified_date: getNow(),
        vote_count: 0,
        vote_status: 0,
      }

      mockAnswers.unshift(newAnswer)

      /*
        답변 mock 데이터를 수정해야 좀 더 정확하게 반영할 수 있으나
        시간 상 어려울 것 같아,
        mock 서버 SSE 받는 유저의 아이디를 1로 고정 (testUser1)
      */
      mockSSENotification<ALERT_TYPE.QUESTION_REPLY>({
        targetUserId: 1,
        message: {
          alert_type: "QUESTION_REPLY",
          id: "1",
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
  ),
  // 답변 수정
  http.put<
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

      if (targetAnswer) targetAnswer.content = content
      if (targetAnswer) targetAnswer.answer_image_url = image_url

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
  ),
  // 답변 삭제
  http.delete<{ id: string }, DefaultBodyType, DeleteAnswerResponse>(
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
  ),
  // 답변 투표 생성
  http.post<{ id: string }, CreateVoteRequest, CreateVoteResponse>(
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

        await sleep(4000)

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
  ),
  // 답변 투표 삭제
  http.delete<{ id: string }, DeleteVoteRequest, DeleteVoteResponse>(
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

        if (targetAnswer.vote_status === 1) targetAnswer.vote_count--
        if (targetAnswer.vote_status === -1) targetAnswer.vote_count++
        targetAnswer.vote_status = 0

        await sleep(4000)

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
  ),
  // AI 인턴 호출 (자동 답변)
  http.post<
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
              AnswerApiStatus.createAIAutoResponse.InternalServerError
                .HttpStatus,
          },
        )
      }
    },
  ),
]

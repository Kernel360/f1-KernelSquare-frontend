import {
  CreateAnswerRequest,
  CreateAnswerResponse,
} from "@/interfaces/dto/answer/create-answer.dto"
import { apiInstance } from "./axios"
import { AxiosError, AxiosResponse } from "axios"
import { RouteMap } from "./route-map"
import type {
  UpdateAnswerRequest,
  UpdateAnswerResponse,
} from "@/interfaces/dto/answer/update-answer.dto"
import type {
  CreateVoteRequest,
  CreateVoteResponse,
} from "@/interfaces/dto/answer/create-vote.dto"
import type { APIResponse } from "@/interfaces/dto/api-response"
import type {
  GetAnswerRequest,
  GetAnswerResponse,
} from "@/interfaces/dto/answer/get-answerlist.dto"
import type {
  DeleteAnswerRequest,
  DeleteAnswerResponse,
} from "@/interfaces/dto/answer/delete-answer.dto"
import type { DefaultBodyType } from "msw"
import {
  DeleteVoteRequest,
  DeleteVoteResponse,
} from "@/interfaces/dto/answer/delete-vote.dto"
import {
  CreateAIAutoAnswerRequest,
  CreateAIAutoAnswerResponse,
} from "@/interfaces/dto/answer/create-AI-auto-answer"

export async function getAnswer({ questionId }: GetAnswerRequest) {
  const res = await apiInstance
    .get<GetAnswerResponse>(`${RouteMap.answer.getAnswer(questionId)}`)
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log("answers res", { response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

export async function createAnswer({
  questionId,
  member_id,
  content,
  image_url,
}: CreateAnswerRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateAnswerResponse>,
    Omit<CreateAnswerRequest, "questionId">
  >(RouteMap.answer.createAnswer(questionId), {
    member_id,
    content,
    image_url,
  })

  return res
}

export async function updateAnswer({
  answerId,
  content,
  image_url,
}: UpdateAnswerRequest) {
  const res = await apiInstance
    .put<
      any,
      AxiosResponse<UpdateAnswerResponse>,
      Omit<UpdateAnswerRequest, "answerId">
    >(RouteMap.answer.updateAnswer(answerId), {
      content,
      image_url,
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

export async function deleteAnswer({ answerId }: DeleteAnswerRequest) {
  const res = await apiInstance
    .delete<any, AxiosResponse<DeleteAnswerResponse>, DefaultBodyType>(
      RouteMap.answer.deleteAnswer(answerId),
    )
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

export async function createAIAutoAnswer({
  questionId,
}: CreateAIAutoAnswerRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<CreateAIAutoAnswerResponse>,
    Omit<CreateAIAutoAnswerRequest, "questionId">
  >(RouteMap.answer.createAIAutoAnswer(questionId))

  return res
}

export async function voteAnswer({
  answerId,
  member_id,
  status,
}: CreateVoteRequest) {
  const res = await apiInstance
    .post<
      any,
      AxiosResponse<CreateVoteResponse>,
      Omit<CreateVoteRequest, "answerId">
    >(RouteMap.answer.voteAnswer(answerId), {
      member_id,
      status,
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

export async function deleteVote({ answerId }: DeleteVoteRequest) {
  const res = await apiInstance
    .delete<any, AxiosResponse<DeleteVoteResponse>, DeleteVoteRequest>(
      RouteMap.answer.voteAnswer(answerId),
    )
    .catch((err) => {
      if (err instanceof AxiosError) {
        const { response } = err as AxiosError<APIResponse>

        console.log({ response: response?.data })
      }
      console.log("err", err)
      throw err
    })

  return res
}

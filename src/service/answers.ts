import {
  CreateAnswerRequest,
  CreateAnswerResponse,
} from "@/interfaces/dto/answer/create-answer.dto"
import { apiInstance } from "./axios"
import { AxiosError, AxiosResponse } from "axios"
import { RouteMap } from "./route-map"
import {
  UpdateAnswerRequest,
  UpdateAnswerResponse,
} from "@/interfaces/dto/answer/update-answer.dto"
import {
  CreateVoteRequest,
  CreateVoteResponse,
} from "@/interfaces/dto/answer/create-vote.dto"
import { APIResponse } from "@/interfaces/dto/api-response"

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
  const res = await apiInstance.post<
    any,
    AxiosResponse<UpdateAnswerResponse>,
    Omit<UpdateAnswerRequest, "answerId">
  >(RouteMap.answer.createAnswer(answerId), {
    content,
    image_url,
  })

  return res
}

export async function updateVote({
  answerId,
  content,
  image_url,
}: UpdateAnswerRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<UpdateAnswerResponse>,
    Omit<UpdateAnswerRequest, "answerId">
  >(RouteMap.answer.updateAnswer(answerId), {
    content,
    image_url,
  })

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

"use client"

import queryKey, { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import {
  CreateAnswerRequest,
  CreateAnswerResponse,
} from "@/interfaces/dto/answer/create-answer.dto"
import { APIResponse } from "@/interfaces/dto/api-response"
import { createAnswer } from "@/service/answers"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { toast } from "react-toastify"

type CreateAnswerVariables = CreateAnswerRequest

interface UseCreateAnswer {
  questionId: number
  onSuccess?: (
    data: AxiosResponse<CreateAnswerResponse, any>,
    variables: CreateAnswerRequest,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: CreateAnswerRequest,
    context: unknown,
  ) => void
}

export function useCreateAnswer({
  questionId,
  onSuccess,
  onError,
}: UseCreateAnswer) {
  const queryClient = useQueryClient()
  const { clientSessionReset } = useClientSession()

  const { mutate: createAnswerApi, status: createAnswerApiStatus } =
    useMutation({
      mutationKey: QUESTION_QUERY_KEY.createAnswer(questionId),
      mutationFn: (request: CreateAnswerVariables) =>
        createAnswer({ ...request }),
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: QUESTION_QUERY_KEY.questionAnswers(questionId),
        })

        onSuccess && onSuccess(data, variables, context)
      },
      onError(error, variables, context) {
        onError && onError(error, variables, context)

        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인 후 답변 생성이 가능합니다", {
                position: "top-center",
              })
            }, 0)

            return
          }

          toast.error(response?.data.msg ?? "답변 생성에 실패했습니다", {
            position: "top-center",
          })
          return
        }

        toast.error("답변 생성에 실패했습니다", {
          position: "top-center",
          toastId: "createAnswerError",
        })
      },
    })

  return {
    createAnswerApi,
    createAnswerApiStatus,
  }
}

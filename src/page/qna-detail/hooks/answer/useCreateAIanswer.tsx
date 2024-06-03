"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import { CreateAIAutoAnswerResponse } from "@/interfaces/dto/answer/create-AI-auto-answer"
import { createAIAutoAnswer } from "@/service/answers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

interface UseCreateAIanswer {
  questionId: number
  onSuccess?: (
    data: AxiosResponse<CreateAIAutoAnswerResponse, any>,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useCreateAIanswer({
  questionId,
  onSuccess,
  onError,
}: UseCreateAIanswer) {
  const { mutate: createAIanswerApi, status: createAIanswerApiStatus } =
    useMutation({
      mutationKey: QUESTION_QUERY_KEY.createAIanswer(questionId),
      mutationFn: () => createAIAutoAnswer({ questionId }),
      onSuccess,
      onError,
    })

  return {
    createAIanswerApi,
    createAIanswerApiStatus,
  }
}

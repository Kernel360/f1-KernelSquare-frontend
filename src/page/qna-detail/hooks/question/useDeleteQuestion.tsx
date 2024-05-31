"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import { DeleteQuestionResponse } from "@/interfaces/dto/question/delete-question.dto"
import { deleteQuestion } from "@/service/question"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

interface UseDeleteQuestion {
  questionId: number
  onSuccess?: (
    data: AxiosResponse<DeleteQuestionResponse, any>,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useDeleteQuestion({
  questionId,
  onSuccess,
  onError,
}: UseDeleteQuestion) {
  const { mutate: deleteQuestionApi, status: deleteQuestionApiStatus } =
    useMutation({
      mutationKey: QUESTION_QUERY_KEY.deleteQuestion(questionId),
      mutationFn: () => deleteQuestion({ questionId }),
      onSuccess,
      onError,
    })

  return {
    deleteQuestionApi,
    deleteQuestionApiStatus,
  }
}

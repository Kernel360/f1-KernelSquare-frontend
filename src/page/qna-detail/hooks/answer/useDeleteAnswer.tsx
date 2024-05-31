"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import { DeleteAnswerResponse } from "@/interfaces/dto/answer/delete-answer.dto"
import { APIResponse } from "@/interfaces/dto/api-response"
import { deleteAnswer } from "@/service/answers"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { toast } from "react-toastify"

interface UseDeleteAnswer {
  answerId: number
  questionId: number
  onSuccess?: (
    data: AxiosResponse<DeleteAnswerResponse, any>,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useDeleteAnswer({
  answerId,
  questionId,
  onSuccess,
  onError,
}: UseDeleteAnswer) {
  const queryClient = useQueryClient()
  const { clientSessionReset } = useClientSession()

  const { mutate: deleteAnswerApi, status: deleteAnswerApiStatus } =
    useMutation({
      mutationKey: QUESTION_QUERY_KEY.deleteAnswer(answerId),
      mutationFn: () => deleteAnswer({ answerId }),
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: QUESTION_QUERY_KEY.questionAnswers(questionId),
        })

        onSuccess && onSuccess(data, variables, context)
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인 후 답변 삭제가 가능합니다.", {
                position: "top-center",
                toastId: "deleteAnswerUnauthorizedError",
              })
            }, 0)

            onError && onError(error, variables, context)

            return
          }

          toast.error("답변 삭제에 실패했습니다.", {
            position: "top-center",
            toastId: "deleteAnswerError",
          })

          onError && onError(error, variables, context)

          return
        }

        toast.error("답변 삭제에 실패했습니다.", {
          position: "top-center",
          toastId: "deleteAnswerError",
        })

        onError && onError(error, variables, context)
      },
    })

  return {
    deleteAnswerApi,
    deleteAnswerApiStatus,
  }
}

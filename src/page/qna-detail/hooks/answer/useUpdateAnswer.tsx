"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import {
  UpdateAnswerRequest,
  UpdateAnswerResponse,
} from "@/interfaces/dto/answer/update-answer.dto"
import { APIResponse } from "@/interfaces/dto/api-response"
import { updateAnswer } from "@/service/answers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { toast } from "react-toastify"

export type UpdateAnswerVariables = Omit<UpdateAnswerRequest, "answerId">

export interface UpdateAnswerCallback {
  onSuccess?: (
    data: AxiosResponse<UpdateAnswerResponse, any>,
    variables: UpdateAnswerVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: UpdateAnswerVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
}

interface UseUpdateAnswer extends UpdateAnswerCallback {
  answerId: number
}

export function useUpdateAnswer({
  answerId,
  onSuccess,
  onError,
}: UseUpdateAnswer) {
  const { clientSessionReset } = useClientSession()

  const { mutate: updateAnswerApi, status: updateAnswerApiStatus } =
    useMutation({
      mutationKey: QUESTION_QUERY_KEY.updateAnswer(answerId),
      mutationFn: (payload: UpdateAnswerVariables) =>
        updateAnswer({ ...payload, answerId }),
      onSuccess,
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인 후 답변 수정이 가능합니다.", {
                position: "top-center",
                toastId: "updateAnswerUnauthorizedError",
              })
            }, 0)

            onError && onError(error, variables, context)

            return
          }

          toast.error(response?.data?.msg ?? "답변 삭제에 실패했습니다", {
            position: "top-center",
          })

          onError && onError(error, variables, context)

          return
        }

        toast.error("답변 수정에 실패했습니다.", {
          position: "top-center",
          toastId: "updateAnswerError",
        })

        onError && onError(error, variables, context)
      },
    })

  return {
    updateAnswerApi,
    updateAnswerApiStatus,
  }
}

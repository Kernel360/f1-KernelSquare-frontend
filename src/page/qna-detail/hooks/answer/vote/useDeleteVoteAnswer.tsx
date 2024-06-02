"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import { DeleteVoteResponse } from "@/interfaces/dto/answer/delete-vote.dto"
import { APIResponse } from "@/interfaces/dto/api-response"
import { deleteVote } from "@/service/answers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { toast } from "react-toastify"

interface UseDeleteVoteAnswer {
  answerId: number
  onSuccess?: (
    data: AxiosResponse<DeleteVoteResponse, any>,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: void,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useDeleteVoteAnswer({
  answerId,
  onSuccess,
  onError,
}: UseDeleteVoteAnswer) {
  const { clientSessionReset } = useClientSession()

  const { mutate: deleteVoteAnswerApi, status: deleteVoteAnswerApiStatus } =
    useMutation({
      mutationKey: QUESTION_QUERY_KEY.deleteVoteAnswer(answerId),
      mutationFn: () => deleteVote({ answerId }),
      onSuccess,
      onError(error, variables, context) {
        onError && onError(error, variables, context)

        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인 후 투표 삭제가 가능합니다", {
                position: "top-center",
              })
            }, 0)

            return
          }

          toast.error("투표 삭제 중 에러가 발생했습니다", {
            position: "top-center",
          })

          return
        }

        toast.error("투표 삭제 중 에러가 발생했습니다", {
          position: "top-center",
        })
      },
    })

  return {
    deleteVoteAnswerApi,
    deleteVoteAnswerApiStatus,
  }
}

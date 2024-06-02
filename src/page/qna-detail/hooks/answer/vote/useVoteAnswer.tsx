"use client"

import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { VoteStatus } from "@/interfaces/answer"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import { CreateVoteResponse } from "@/interfaces/dto/answer/create-vote.dto"
import { APIResponse } from "@/interfaces/dto/api-response"
import { voteAnswer } from "@/service/answers"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { toast } from "react-toastify"

interface VoteAnswerVariables {
  voteStatus: VoteStatus
}

interface UseVoteLikeAnswer {
  answerId: number
  onSuccess?: (
    data: AxiosResponse<CreateVoteResponse, any>,
    variables: VoteAnswerVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: VoteAnswerVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useVoteAnswer({
  answerId,
  onSuccess,
  onError,
}: UseVoteLikeAnswer) {
  const { user, clientSessionReset } = useClientSession()

  const { mutate: voteAnswerApi, status: voteAnswerApiStatus } = useMutation({
    mutationKey: QUESTION_QUERY_KEY.voteAnswer(answerId),
    mutationFn: ({ voteStatus }: VoteAnswerVariables) =>
      voteAnswer({
        member_id: user?.member_id ?? -1,
        answerId,
        status: voteStatus,
      }),
    onSuccess,
    onError(error, variables, context) {
      onError && onError(error, variables, context)

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          clientSessionReset()

          setTimeout(() => {
            toast.error("로그인 후 투표가 가능합니다", {
              position: "top-center",
            })
          }, 0)

          return
        }

        toast.error(
          variables.voteStatus === VoteStatus.LIKED
            ? "UP(추천) 투표 중 에러가 발생했습니다"
            : "DOWN(비추천) 투표 중 에러가 발생했습니다",
        )

        return
      }

      toast.error(
        variables.voteStatus === VoteStatus.LIKED
          ? "UP(추천) 투표 중 에러가 발생했습니다"
          : "DOWN(비추천) 투표 중 에러가 발생했습니다",
      )
    },
  })

  return {
    voteAnswerApi,
    voteAnswerApiStatus,
  }
}

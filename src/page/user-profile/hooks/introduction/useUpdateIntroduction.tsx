"use client"

import { USER_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import {
  UpdateMemberIntroductionRequest,
  UpdateMemberIntroductionResponse,
} from "@/interfaces/dto/member/update-member-introduction.dto"
import { updateMemberIntroduction } from "@/service/member"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export type UpdateIntroductionVariables = Omit<
  UpdateMemberIntroductionRequest,
  "memberId"
>

export interface UpdateUserIntroductionCallback {
  onSuccess?: (
    data: AxiosResponse<UpdateMemberIntroductionResponse, any>,
    variables: UpdateIntroductionVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: UpdateIntroductionVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
}

interface UseUpdateUserIntroduction extends UpdateUserIntroductionCallback {}

export function useUpdateUserIntroduction({
  onSuccess,
  onError,
}: UseUpdateUserIntroduction = {}) {
  const { user } = useClientSession()

  const {
    mutate: updateUserIntroductionApi,
    status: updateUserIntroductionApiStatus,
  } = useMutation({
    mutationKey: USER_QUERY_KEY.updateIntroduction(user?.member_id ?? -1),
    mutationFn: ({ introduction }: UpdateIntroductionVariables) =>
      updateMemberIntroduction({
        memberId: user?.member_id ?? -1,
        introduction: introduction ?? "",
      }),
    onSuccess,
    onError,
  })

  return {
    updateUserIntroductionApi,
    updateUserIntroductionApiStatus,
  }
}

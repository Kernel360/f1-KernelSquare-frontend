"use client"

import { USER_QUERY_KEY } from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import {
  UpdateMemberProfileImageRequest,
  UpdateMemberProfileImageResponse,
} from "@/interfaces/dto/member/update-member-profile-image-dto"
import { updateMemberProfileImage } from "@/service/member"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export type UpdateUserProfileImageVariables = Omit<
  UpdateMemberProfileImageRequest,
  "memberId"
>

interface UseUpdateUserProfileImage {
  onSuccess?: (
    data: AxiosResponse<UpdateMemberProfileImageResponse, any>,
    variables: UpdateUserProfileImageVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: UpdateUserProfileImageVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
}

export function useUpdateUserProfileImage({
  onSuccess,
  onError,
}: UseUpdateUserProfileImage = {}) {
  const { user } = useClientSession()

  const {
    mutate: updateUserProfileImageApi,
    status: updateUserProfileImageApiStatus,
  } = useMutation({
    mutationKey: USER_QUERY_KEY.updateProfileImage(user?.member_id ?? -1),
    mutationFn: ({ image_url }: UpdateUserProfileImageVariables) =>
      updateMemberProfileImage({ memberId: user?.member_id ?? -1, image_url }),
    onSuccess,
    onError,
  })

  return {
    updateUserProfileImageApi,
    updateUserProfileImageApiStatus,
  }
}

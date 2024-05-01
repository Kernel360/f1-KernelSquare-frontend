"use client"

import { DuplicateCheckNickNameResponse } from "@/interfaces/dto/auth/duplicate-check-nickname.dto"
import { duplicateCheckNickname } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

interface UseNicknameMutationOptions {
  mutationKey?: any[]
  onSuccess?: (
    data: AxiosResponse<DuplicateCheckNickNameResponse, any>,
    variables: string,
    context: unknown,
  ) => void
  onError?: (error: Error, variables: string, context: unknown) => void
}

export function useNicknameMutation({
  mutationKey = ["nicknameMutation"],
  onSuccess,
  onError,
}: UseNicknameMutationOptions = {}) {
  const { mutate: checkNicknameDuplicateApi } = useMutation({
    mutationKey,
    mutationFn: (nickname: string) => duplicateCheckNickname({ nickname }),
    onSuccess,
    onError,
  })

  return {
    checkNicknameDuplicateApi,
  }
}

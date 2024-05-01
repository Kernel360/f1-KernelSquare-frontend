"use client"

import { DuplicateCheckEmailResponse } from "@/interfaces/dto/auth/duplicate-check-email.dto"
import { duplicateCheckEmail } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

interface UseEmailMutationOptions {
  mutationKey?: any[]
  onSuccess?: (
    data: AxiosResponse<DuplicateCheckEmailResponse, any>,
    variables: string,
    context: unknown,
  ) => void
  onError?: (error: Error, variables: string, context: unknown) => void
}

export function useEmailMutation({
  mutationKey = ["emailMutation"],
  onSuccess,
  onError,
}: UseEmailMutationOptions = {}) {
  const { mutate: checkEmailDuplicateApi } = useMutation({
    mutationKey,
    mutationFn: (email: string) => duplicateCheckEmail({ email }),
    onSuccess,
    onError,
  })

  return {
    checkEmailDuplicateApi,
  }
}

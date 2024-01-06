"use client"

import LoginForm from "@/components/form/LoginForm"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { duplicateCheckNickname } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { FieldValues, UseFormTrigger } from "react-hook-form"
import { toast } from "react-toastify"
import { useSetRecoilState } from "recoil"

interface UseNicknameMutationOptions<T extends FieldValues> {
  trigger: UseFormTrigger<T>
  nicknameFieldName?: string
}

export function useNicknameMutation<T extends FieldValues>({
  trigger,
  nicknameFieldName = "nickname",
}: UseNicknameMutationOptions<T>) {
  const setDuplicate = useSetRecoilState(duplicateState)

  const { mutate: checkNicknameDuplicateApi } = useMutation({
    mutationFn: (nickname: string) => duplicateCheckNickname({ nickname }),
    onSuccess(payload, nickname) {
      setDuplicate((prev) => ({
        ...prev,
        nickname: {
          checkedDuplicate: true,
          isDuplicate: false,
        },
      }))
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error

        if (response?.status === HttpStatusCode.Conflict) {
          setDuplicate((prev) => ({
            ...prev,
            nickname: {
              checkedDuplicate: true,
              isDuplicate: true,
            },
          }))

          return
        }
      }

      toast.error(LoginForm.InternalServerErrorToast, {
        position: "top-center",
      })

      return
    },
    onSettled() {
      const nicknameField = document.querySelector(
        `input[name="${nicknameFieldName}"]`,
      ) as HTMLInputElement | null

      nicknameField?.focus()
    },
  })

  const checkNicknameDuplicate = async (nickname: string) => {
    const isValid = await trigger(nicknameFieldName as any)

    if (!isValid) {
      const nicknameField = document.querySelector(
        `input[name="${nicknameFieldName}"]`,
      ) as HTMLInputElement | null

      nicknameField?.focus()

      return
    }

    checkNicknameDuplicateApi(nickname)
  }

  return {
    checkNicknameDuplicate,
  }
}

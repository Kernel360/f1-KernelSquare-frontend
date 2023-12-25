"use client"

import { duplicateState } from "@/recoil/atoms/duplicate"
import { duplicateCheckNickname } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { FieldValues, UseFormTrigger } from "react-hook-form"
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

      alert("서버 에러가 발생했습니다. 잠시후 다시 이용해주세요.")

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

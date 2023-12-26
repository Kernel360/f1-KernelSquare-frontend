"use client"

import { duplicateState } from "@/recoil/atoms/duplicate"
import { duplicateCheckEmail } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { FieldValues, UseFormTrigger } from "react-hook-form"
import { useSetRecoilState } from "recoil"

interface UseEmailMutationOptions<T extends FieldValues> {
  trigger: UseFormTrigger<T>
  emailFieldName?: string
}

export function useEmailMutation<T extends FieldValues>({
  trigger,
  emailFieldName = "email",
}: UseEmailMutationOptions<T>) {
  const setDuplicate = useSetRecoilState(duplicateState)

  const { mutate: checkEmailDuplicateApi } = useMutation({
    mutationFn: (email: string) => duplicateCheckEmail({ email }),
    onSuccess(payload, email) {
      setDuplicate((prev) => ({
        ...prev,
        email: {
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
            email: {
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
      const emailField = document.querySelector(
        `input[name="${emailFieldName}"]`,
      ) as HTMLInputElement | null

      emailField?.focus()
    },
  })

  const checkEmailDuplicate = async (email: string) => {
    const isValid = await trigger(emailFieldName as any)

    if (!isValid) {
      const emailField = document.querySelector(
        `input[name="${emailFieldName}"]`,
      ) as HTMLInputElement | null

      emailField?.focus()

      return
    }

    checkEmailDuplicateApi(email)
  }

  return {
    checkEmailDuplicate,
  }
}

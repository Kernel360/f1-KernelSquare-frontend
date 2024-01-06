"use client"

import LoginForm from "@/components/form/LoginForm"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { duplicateCheckEmail } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { FieldValues, UseFormTrigger } from "react-hook-form"
import { ToastContentProps, toast } from "react-toastify"
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

      toast.error(LoginForm.InternalServerErrorToast, {
        position: "top-center",
      })

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

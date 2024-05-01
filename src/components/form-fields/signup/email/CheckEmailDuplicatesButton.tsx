"use client"

import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import { useEmailMutation } from "@/hooks/useEmailMutation"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { AxiosError, HttpStatusCode } from "axios"
import { toast } from "react-toastify"
import { useSetRecoilState } from "recoil"

function CheckEmailDuplicatesButton({
  email,
  disabled,
  invalidEmail,
  onMutateError,
}: {
  email: string
  disabled?: boolean
  invalidEmail?: boolean
  onMutateError?: (type: "duplicate" | "error") => void
}) {
  const setSignupDuplicate = useSetRecoilState(duplicateState)

  const { checkEmailDuplicateApi } = useEmailMutation({
    onSuccess(data, variables) {
      setSignupDuplicate((prev) => ({
        ...prev,
        email: {
          checkedDuplicate: true,
          isDuplicate: false,
        },
      }))
    },
    onError(error, variables) {
      if (error instanceof AxiosError) {
        const { response } = error

        if (response?.status === HttpStatusCode.Conflict) {
          setSignupDuplicate((prev) => ({
            ...prev,
            email: {
              checkedDuplicate: true,
              isDuplicate: true,
            },
          }))

          onMutateError && onMutateError("duplicate")

          return
        }
      }

      toast.error(LoginForm.InternalServerErrorToast, {
        position: "top-center",
      })

      onMutateError && onMutateError("error")
    },
  })

  const checkEmailDuplicate = () => {
    if (invalidEmail) {
      toast.error("유효한 이메일 형식이 아닙니다", {
        position: "top-center",
        toastId: "invalidEmail",
      })

      return
    }

    checkEmailDuplicateApi(email)
  }

  return (
    <Button
      type="button"
      className="w-full h-12 align-top disabled:bg-colorsGray"
      disabled={disabled}
      buttonTheme={"primary"}
      onClick={checkEmailDuplicate}
    >
      중복확인
    </Button>
  )
}

export default CheckEmailDuplicatesButton

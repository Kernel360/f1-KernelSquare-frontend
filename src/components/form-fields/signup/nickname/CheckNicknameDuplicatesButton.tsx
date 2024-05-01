"use client"

import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import { useNicknameMutation } from "@/hooks/useNicknameMutation"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { AxiosError, HttpStatusCode } from "axios"
import { toast } from "react-toastify"
import { useSetRecoilState } from "recoil"

function CheckNicknameDuplicatesButton({
  nickname,
  disabled,
  invalidNickname,
  onMutateError,
}: {
  nickname: string
  disabled?: boolean
  invalidNickname?: boolean
  onMutateError?: (type: "duplicate" | "error") => void
}) {
  const setSignupDuplicate = useSetRecoilState(duplicateState)

  const { checkNicknameDuplicateApi } = useNicknameMutation({
    onSuccess(data, variables) {
      setSignupDuplicate((prev) => ({
        ...prev,
        nickname: {
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
            nickname: {
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
    if (invalidNickname) {
      toast.error("유효한 닉네임 형식이 아닙니다", {
        position: "top-center",
        toastId: "invalidNickname",
      })

      return
    }

    checkNicknameDuplicateApi(nickname)
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

export default CheckNicknameDuplicatesButton

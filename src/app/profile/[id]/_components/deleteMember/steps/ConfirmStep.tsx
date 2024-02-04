"use client"

import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import DeleteMemberModal from "../DeleteMemberModal"
import { FieldErrors } from "react-hook-form"
import { useClientSession } from "@/hooks/useClientSession"
import { Input } from "@/components/shared/input/Input"
import Button from "@/components/shared/button/Button"
import { toast } from "react-toastify"

interface ConfirmData {
  nickname: string
}

function ConfirmStep({
  register,
  handleSubmit,
  watch,
  setStep,
}: FunnelStepFunctionComponentProps<ConfirmData>) {
  const { user } = useClientSession()

  const isValid = watch("nickname") === user?.nickname

  const onSubmit = (data: ConfirmData) => {
    setStep("submit")
  }

  const onInvalid = (errors: FieldErrors<ConfirmData>) => {
    const confirmErrorType = errors.nickname?.type

    if (confirmErrorType === "validate") {
      toast.error("올바른 값을 입력창에 입력해주세요", {
        position: "bottom-center",
      })

      return
    }

    toast.error("검증 필드에 값을 입력해주세요", { position: "bottom-center" })
  }

  return (
    <DeleteMemberModal.ContentWrapper>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col w-full"
      >
        <h3 className="font-bold text-secondary text-sm mb-3">
          본인이 맞는지 검증하려고 합니다.
          <br />
          <span className="block mt-2">
            탈퇴하기를 원하실 경우
            <br />
            <span className="text-danger">{user?.nickname}</span>을(를) 아래
            입력창에 입력해주세요.
          </span>
        </h3>
        <div className="mb-2">
          <Input
            fullWidth
            className="h-9"
            autoComplete="off"
            {...register("nickname", {
              required: true,
              validate: (value) => {
                if (value !== user?.nickname) {
                  return false
                }

                return true
              },
            })}
          />
        </div>
        <Button
          type="submit"
          disabled={!isValid}
          className="border border-colorsGray bg-colorsLightGray text-danger disabled:bg-colorsGray disabled:text-colorsLightGray"
        >
          회원 탈퇴하기
        </Button>
      </form>
    </DeleteMemberModal.ContentWrapper>
  )
}

export default ConfirmStep

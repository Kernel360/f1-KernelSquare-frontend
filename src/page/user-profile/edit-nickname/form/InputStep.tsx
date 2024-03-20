"use client"

import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import Guideline from "@/components/shared/input/Guideline"
import { Input } from "@/components/shared/input/Input"
import { Button } from "@/components/ui/button"
import { useClientSession } from "@/hooks/useClientSession"
import { duplicateCheckNickname } from "@/service/auth"
import { Validator } from "@/util/validate"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, HttpStatusCode } from "axios"
import { toast } from "react-toastify"
import EditNicknameCancel from "../EditNicknameCancel"

export interface InputStepFormData {
  nickname: string
  nicknameDuplicateCheck: "valid" | "duplicate" | "required"
}

const validator = new Validator()

function InputStep({
  register,
  trigger,
  handleSubmit,
  getValues,
  setValue,
  setStep,
  formState: { errors, isValid },
  watch,
}: FunnelStepFunctionComponentProps<InputStepFormData>) {
  const { user } = useClientSession()

  const field = {
    nickname: watch("nickname"),
    nicknameDuplicateCheck: watch("nicknameDuplicateCheck"),
  }

  const { mutate: checkNicknameDuplicateApi, status } = useMutation({
    mutationFn: (nickname: string) => duplicateCheckNickname({ nickname }),
    onSuccess(payload, nickname) {
      setValue("nicknameDuplicateCheck", "valid")
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error

        if (response?.status === HttpStatusCode.Conflict) {
          setValue("nicknameDuplicateCheck", "duplicate")
        }

        return
      }

      setValue("nicknameDuplicateCheck", "required")

      toast.error("닉네임 중복 체크 실패", {
        position: "bottom-center",
        toastId: "nicknameError",
      })
    },
    onSettled() {
      trigger("nickname")
    },
  })

  const buttonDisabledClassNames =
    "disabled:bg-colorsGray disabled:text-colorsDarkGray"

  const duplicateCheck = () => {
    if (status === "pending") return

    const nickname = getValues("nickname")

    checkNicknameDuplicateApi(nickname)
  }

  const onSubmit = (data: InputStepFormData) => {
    setStep("Confirm")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex justify-center mb-4">
        원하시는 닉네임을 입력해 주세요
      </div>
      <div className="w-[360px] mx-auto max-w-full">
        <div className="w-full flex gap-4 justify-center h-[78px]">
          <div className="flex-1">
            <Input
              fullWidth
              autoComplete="off"
              {...register("nickname", {
                required: "닉네임은 필수 입력 항목입니다",
                validate: (nickname) => {
                  const { format, length } =
                    validator.validateNickname(nickname)

                  if (!format()) {
                    return "닉네임은 한글, 영문 조합(공백제외)이어야 합니다."
                  }

                  if (!length()) {
                    return "닉네임은 2자이상 8자이하(공백제외)이어야 합니다."
                  }

                  if (nickname === user?.nickname) {
                    return "사용중인 닉네임 입니다."
                  }

                  if (getValues("nicknameDuplicateCheck") === "required") {
                    return "닉네임 중복 체크를 해주세요."
                  }

                  if (getValues("nicknameDuplicateCheck") === "duplicate") {
                    return "사용중인 닉네임 입니다."
                  }

                  return true
                },
                onChange: () => {
                  if (getValues("nicknameDuplicateCheck") !== "required") {
                    setValue("nicknameDuplicateCheck", "required")
                  }
                  trigger("nickname")
                },
              })}
              error={!!errors.nickname?.message}
              errorMessage={
                errors.nickname?.message?.includes("닉네임 중복") ||
                errors.nickname?.message?.includes("사용중인")
                  ? errors.nickname.message
                  : undefined
              }
            />
            {isValid ? (
              <div>
                <span className={"text-primary text-xs"}>
                  사용가능한 닉네임 입니다.
                </span>
              </div>
            ) : null}
          </div>
          <Button
            type="button"
            onClick={duplicateCheck}
            disabled={
              field.nickname === user?.nickname ||
              !validator.validateNickname(field.nickname).allCheck() ||
              field.nicknameDuplicateCheck === "valid"
            }
            className={buttonDisabledClassNames}
          >
            중복 체크
          </Button>
          <input
            {...register("nicknameDuplicateCheck")}
            hidden
            defaultValue={
              "required" as InputStepFormData["nicknameDuplicateCheck"]
            }
          />
        </div>
        <div>
          <div className="text-colorsDarkGray text-sm">닉네임 규칙</div>
          <Guideline
            open
            guildeline={[
              {
                label: "- 영문대소문자 / 완전한 한글 조합(ex. 가)",
                valid: validator.validateNickname(field.nickname).format(),
              },
              {
                label: "- 2자이상 8자 이하(공백제외)",
                valid: validator.validateNickname(field.nickname).length(),
              },
              {
                label: "- 중복되지 않는 닉네임",
                valid: field.nicknameDuplicateCheck === "valid",
              },
              {
                label: "- 기존 닉네임과 다름",
                valid: field.nickname !== user?.nickname,
              },
            ]}
          />
        </div>
      </div>
      <div className="mt-4 w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          variant={"secondary"}
          disabled={!isValid}
          className={`w-[116px] ${buttonDisabledClassNames}`}
        >
          다음 단계
        </Button>
        <EditNicknameCancel />
      </div>
    </form>
  )
}

export default InputStep

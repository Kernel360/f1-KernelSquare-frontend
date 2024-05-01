"use client"

import { Input } from "@/components/shared/input/Input"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { Control, Controller } from "react-hook-form"
import { useRecoilState } from "recoil"
import { nicknameRules } from "./nicknameRules"
import CheckNicknameDuplicatesButton from "./CheckNicknameDuplicatesButton"
import { twMerge } from "tailwind-merge"
import NicknameGuideLine from "@/components/guide-lines/signup/NicknameGuideLine"
import { SignupHookFormData } from "@/interfaces/form"

interface NicknameFieldControllerProps {
  control: Control<SignupHookFormData, any>
  disabled?: boolean
}

function NicknameFieldController({
  control,
  disabled,
}: NicknameFieldControllerProps) {
  const [signupDuplicate, setSignupDuplicate] = useRecoilState(duplicateState)

  const focusInputElement = (name: string) => {
    ;(
      document.querySelector(`input[name="${name}"]`) as HTMLElement | null
    )?.focus()
  }

  const classNames = (isError: boolean) =>
    twMerge([
      "h-12 focus:border-secondary disabled:bg-colorsLightGray",
      !isError &&
        signupDuplicate.nickname.checkedDuplicate &&
        !signupDuplicate.nickname.isDuplicate &&
        "border-primary focus:border-primary",
    ])

  return (
    <Controller
      control={control}
      name="nickname"
      rules={nicknameRules({ signupDuplicate, setSignupDuplicate })}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor={field.name}
                className="text-[#909090] font-medium"
              >
                닉네임
              </label>
            </div>
            <div>
              <NicknameGuideLine nickname={field.value} />
            </div>
            <div className="flex gap-2 h-[72px]">
              <div className="basis-0 flex-1">
                <Input
                  ref={field.ref}
                  name={field.name}
                  id={field.name}
                  placeholder="닉네임 입력"
                  disabled={disabled}
                  fullWidth
                  className={classNames(!!fieldState.error)}
                  error={!!fieldState.error}
                  errorMessage={
                    fieldState.error?.type === "duplicate" ? (
                      <Input.ErrorMessage className="mt-2">
                        {fieldState.error.message}
                      </Input.ErrorMessage>
                    ) : undefined
                  }
                  helpMessage={
                    signupDuplicate.nickname.checkedDuplicate &&
                    !signupDuplicate.nickname.isDuplicate ? (
                      <Input.HelpMessage className="text-primary mt-2">
                        사용가능한 닉네임 입니다.
                      </Input.HelpMessage>
                    ) : undefined
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </div>
              <div className="w-1/5 min-w-fit">
                <CheckNicknameDuplicatesButton
                  nickname={field.value}
                  disabled={
                    disabled || signupDuplicate.nickname.checkedDuplicate
                  }
                  invalidNickname={
                    fieldState.error && fieldState.error.type !== "duplicate"
                  }
                  onMutateError={(type) => {
                    if (type === "duplicate") {
                      control.setError("nickname", {
                        type: "duplicate",
                        message: "이미 사용중인 닉네임 입니다.",
                      })

                      setTimeout(() => {
                        focusInputElement(field.name)
                      }, 0)
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default NicknameFieldController

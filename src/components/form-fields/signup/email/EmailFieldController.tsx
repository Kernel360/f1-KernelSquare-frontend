"use client"

import { Input } from "@/components/shared/input/Input"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { Control, Controller } from "react-hook-form"
import { useRecoilState } from "recoil"
import CheckEmailDuplicatesButton from "./CheckEmailDuplicatesButton"
import { twMerge } from "tailwind-merge"
import EmailGuideLine from "@/components/guide-lines/signup/EmailGuideLine"
import { SignupHookFormData } from "@/interfaces/form"
import { emailRules } from "../../emailRules"

interface EmailFieldControllerProps {
  control: Control<SignupHookFormData, any>
  disabled?: boolean
}

function EmailFieldController({
  control,
  disabled,
}: EmailFieldControllerProps) {
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
        signupDuplicate.email.checkedDuplicate &&
        !signupDuplicate.email.isDuplicate &&
        "border-primary focus:border-primary",
    ])

  return (
    <Controller
      control={control}
      name="email"
      rules={emailRules("signup", {
        signupDuplicate,
        setSignupDuplicate,
      })}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor={field.name}
                className="text-[#909090] font-medium"
              >
                이메일
              </label>
            </div>
            <div>
              <EmailGuideLine email={field.value} />
            </div>
            <div className="flex gap-2 h-[72px]">
              <div className="basis-0 flex-1">
                <Input
                  ref={field.ref}
                  name={field.name}
                  id={field.name}
                  placeholder="이메일 입력"
                  disabled={disabled}
                  fullWidth
                  className={classNames(!!fieldState.error)}
                  autoComplete="off"
                  error={!!fieldState.error}
                  errorMessage={
                    fieldState.error?.type === "duplicate" ? (
                      <Input.ErrorMessage className="mt-2">
                        {fieldState.error.message}
                      </Input.ErrorMessage>
                    ) : undefined
                  }
                  helpMessage={
                    signupDuplicate.email.checkedDuplicate &&
                    !signupDuplicate.email.isDuplicate ? (
                      <Input.HelpMessage className="text-primary mt-2">
                        사용가능한 이메일 입니다.
                      </Input.HelpMessage>
                    ) : undefined
                  }
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </div>
              <div className="w-1/5 min-w-fit">
                <CheckEmailDuplicatesButton
                  email={field.value}
                  disabled={disabled || signupDuplicate.email.checkedDuplicate}
                  invalidEmail={
                    fieldState.error && fieldState.error.type !== "duplicate"
                  }
                  onMutateError={(type) => {
                    if (type === "duplicate") {
                      control.setError("email", {
                        type: "duplicate",
                        message: "이미 사용중인 이메일 입니다.",
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

export default EmailFieldController

"use client"

import { Control, Controller } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { SignupHookFormData } from "@/interfaces/form"
import PasswordField from "../password/PasswordField"
import { passwordCheckRules } from "./passwordCheckRules"
import PasswordCheckGuideLine from "./PasswordCheckGuideLine"

interface SignupPasswordCheckFieldControllerProps {
  control: Control<SignupHookFormData, any>
  disabled?: boolean
}

function PasswordCheckFieldController({
  control,
  disabled,
}: SignupPasswordCheckFieldControllerProps) {
  const wrapperClassNames = ({
    isError,
    isValid,
  }: {
    isError: boolean
    isValid: boolean
  }) =>
    twMerge([
      "h-12 aria-disabled:bg-colorsLightGray",
      isError && "focus-within:border-danger",
      isValid && "border-primary focus-within:border-primary",
    ])

  return (
    <Controller
      control={control}
      name="passwordCheck"
      rules={passwordCheckRules}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor={field.name}
                className="text-[#909090] font-medium"
              >
                비밀번호 확인
              </label>
            </div>
            <div>
              <PasswordCheckGuideLine
                password={control._formValues.password}
                passwordCheck={field.value}
              />
            </div>
            <div>
              <PasswordField
                ref={field.ref}
                name={field.name}
                id={field.name}
                fullWidth
                disabled={disabled}
                error={
                  !!fieldState.error ||
                  control._formValues.password !== field.value
                }
                placeholder="********"
                autoComplete="off"
                classNames={{
                  wrapper: wrapperClassNames({
                    isError: !!fieldState.error,
                    isValid: !!field.value && !fieldState.error,
                  }),
                }}
                passwordVisibleBtnClassName={"disabled:text-colorsDarkGray"}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </div>
          </div>
        )
      }}
    />
  )
}

export default PasswordCheckFieldController

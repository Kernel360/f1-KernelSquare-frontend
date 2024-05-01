"use client"

import { Control, Controller } from "react-hook-form"
import PasswordField from "./PasswordField"
import { passwordRules } from "../../passwordRules"
import { twMerge } from "tailwind-merge"
import { SignupHookFormData } from "@/interfaces/form"
import PasswordGuideLine from "@/components/guide-lines/signup/PasswordGuideLine"

interface SignupPasswordFieldControllerProps {
  control: Control<SignupHookFormData, any>
  disabled?: boolean
}

function PasswordFieldController({
  control,
  disabled,
}: SignupPasswordFieldControllerProps) {
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
      name="password"
      rules={passwordRules("signup")}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor={field.name}
                className="text-[#909090] font-medium"
              >
                비밀번호
              </label>
            </div>
            <div>
              <PasswordGuideLine password={field.value} />
            </div>
            <div>
              <PasswordField
                ref={field.ref}
                name={field.name}
                id={field.name}
                fullWidth
                disabled={disabled}
                error={!!fieldState.error}
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

export default PasswordFieldController

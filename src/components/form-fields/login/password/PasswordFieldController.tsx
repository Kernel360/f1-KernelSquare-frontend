"use client"

import { LoginFormData } from "@/interfaces/form"
import { Control, Controller } from "react-hook-form"
import { passwordRules } from "../../passwordRules"
import PasswordField from "../../signup/password/PasswordField"

interface LoginPasswordFieldControllerProps {
  control: Control<LoginFormData, any>
  disabled?: boolean
}

function PasswordFieldController({
  control,
  disabled,
}: LoginPasswordFieldControllerProps) {
  return (
    <Controller
      control={control}
      name="password"
      rules={passwordRules("login")}
      render={({ field, fieldState }) => {
        return (
          <PasswordField
            ref={field.ref}
            name={field.name}
            id={field.name}
            fullWidth
            disabled={disabled}
            error={!!fieldState.error}
            placeholder="비밀번호"
            autoComplete="off"
            classNames={{
              wrapper:
                "h-12 box-border pl-4 pr-2 py-3.5 aria-disabled:bg-colorsLightGray",
              input: "p-0 placeholder:font-medium placeholder:text-base",
            }}
            passwordVisibleBtnClassName={"disabled:text-colorsDarkGray"}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )
      }}
    />
  )
}

export default PasswordFieldController

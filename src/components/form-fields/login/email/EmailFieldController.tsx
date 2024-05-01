"use client"

import { Input } from "@/components/shared/input/Input"
import { Control, Controller } from "react-hook-form"
import { emailRules } from "../../emailRules"
import { LoginFormData } from "@/interfaces/form"

interface EmailFieldControllerProps {
  control: Control<LoginFormData, any>
  disabled?: boolean
}

function EmailFieldController({
  control,
  disabled,
}: EmailFieldControllerProps) {
  return (
    <Controller
      control={control}
      name="email"
      rules={emailRules("login")}
      render={({ field, fieldState }) => {
        return (
          <Input
            ref={field.ref}
            name={field.name}
            id={field.name}
            placeholder="이메일"
            autoComplete="off"
            fullWidth
            disabled={disabled}
            error={!!fieldState.error}
            className={
              "px-4 py-3.5 h-12 box-border placeholder:font-medium placeholder:text-base focus:border-secondary disabled:bg-colorsLightGray"
            }
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )
      }}
    />
  )
}

export default EmailFieldController

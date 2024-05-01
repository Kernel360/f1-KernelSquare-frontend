"use client"

import { InputProps } from "@/components/shared/input/Input"
import RowInput, { RowInputProps } from "@/components/shared/input/RowInput"
import { ForwardedRef, forwardRef, useState } from "react"
import PasswordVisibleButton from "./PasswordVisibleButton"
import { twMerge } from "tailwind-merge"

interface PasswordFieldProps extends Omit<RowInputProps, "sideField"> {
  passwordVisibleBtnClassName?: string
}

function PasswordField(
  {
    disabled,
    fullWidth,
    error,
    errorMessage,
    helpMessage,
    passwordVisibleBtnClassName,
    ...props
  }: PasswordFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [type, setType] =
    useState<Extract<InputProps["type"], "text" | "password">>("password")

  return (
    <RowInput
      ref={ref}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      error={error}
      errorMessage={errorMessage}
      helpMessage={helpMessage}
      {...props}
      sideField={
        <PasswordVisibleButton
          onPasswordVisibleChange={(passwordvisible) =>
            setType(passwordvisible ? "text" : "password")
          }
          disabled={disabled}
          className={passwordVisibleBtnClassName}
        />
      }
    />
  )
}

export default forwardRef(PasswordField)

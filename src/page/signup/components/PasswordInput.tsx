"use client"

import PasswordField from "@/components/shared/input/PasswordField"
import { RowInputProps } from "@/components/shared/input/RowInput"
import { ForwardedRef, forwardRef } from "react"

interface PasswordInputProps extends Omit<RowInputProps, "sideField"> {
  onAfterFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}

function PasswordInput(
  { onFocus, disabled, onAfterFocus, ...props }: PasswordInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus && onFocus(e)
    onAfterFocus && onAfterFocus(e)
  }

  return (
    <PasswordField
      ref={ref}
      disabled={disabled}
      onFocus={handleFocus}
      {...props}
    />
  )
}

export default forwardRef(PasswordInput)

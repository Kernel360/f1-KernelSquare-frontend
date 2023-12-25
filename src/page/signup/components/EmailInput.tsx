"use client"

import Button from "@/components/shared/button/Button"
import RowInput, { RowInputProps } from "@/components/shared/input/RowInput"
import { useEmailMutation } from "@/hooks/useEmailMutation"
import { checkDuplicateFieldValues } from "@/recoil/atoms/duplicate"
import { ForwardedRef, forwardRef } from "react"
import { UseFormTrigger } from "react-hook-form"
import { useRecoilValue } from "recoil"

interface EmailInputProps extends Omit<RowInputProps, "sideField"> {
  onAfterFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  trigger: UseFormTrigger<any>
}

function EmailInput(
  { trigger, disabled, onFocus, onAfterFocus, ...props }: EmailInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus && onFocus(e)
    onAfterFocus && onAfterFocus(e)
  }

  return (
    <RowInput
      ref={ref}
      disabled={disabled}
      sideField={
        <CheckEmailDuplicatesButton disabled={disabled} trigger={trigger} />
      }
      onFocus={handleFocus}
      {...props}
    />
  )
}

function CheckEmailDuplicatesButton({
  trigger,
  disabled,
}: Pick<EmailInputProps, "trigger"> & { disabled?: boolean }) {
  const { checkEmailDuplicate } = useEmailMutation({ trigger })
  const checkDuplicateField = useRecoilValue(checkDuplicateFieldValues)

  return (
    <Button
      className="disabled:bg-colorsGray"
      disabled={disabled}
      buttonTheme={"primary"}
      onClick={() => checkEmailDuplicate(checkDuplicateField.email)}
    >
      중복확인
    </Button>
  )
}

export default forwardRef(EmailInput)

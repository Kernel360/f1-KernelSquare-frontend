import Button from "@/components/shared/button/Button"
import RowInput, { RowInputProps } from "@/components/shared/input/RowInput"
import { useNicknameMutation } from "@/hooks/useNicknameMutation"
import { checkDuplicateFieldValues } from "@/recoil/atoms/duplicate"
import { ForwardedRef, forwardRef } from "react"
import { UseFormTrigger } from "react-hook-form"
import { useRecoilValue } from "recoil"

interface NicknameInputProps extends Omit<RowInputProps, "sideField"> {
  onAfterFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  trigger: UseFormTrigger<any>
}

function NicknameInput(
  { trigger, disabled, onFocus, onAfterFocus, ...props }: NicknameInputProps,
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
        <CheckNicknameDuplicatesButton disabled={disabled} trigger={trigger} />
      }
      onFocus={handleFocus}
      {...props}
    />
  )
}

function CheckNicknameDuplicatesButton({
  trigger,
  disabled,
}: Pick<NicknameInputProps, "trigger"> & { disabled?: boolean }) {
  const { checkNicknameDuplicate } = useNicknameMutation({ trigger })
  const checkDuplicateField = useRecoilValue(checkDuplicateFieldValues)

  return (
    <Button
      className="disabled:bg-colorsGray"
      disabled={disabled}
      buttonTheme="primary"
      onClick={() => checkNicknameDuplicate(checkDuplicateField.nickname)}
    >
      중복확인
    </Button>
  )
}

export default forwardRef(NicknameInput)

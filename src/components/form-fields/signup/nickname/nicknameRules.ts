import { SignupHookFormData } from "@/interfaces/form"
import {
  SignupDuplicateState,
  duplicateDefaultState,
} from "@/recoil/atoms/duplicate"
import { validatorInstance } from "@/util/validate"
import { RegisterOptions } from "react-hook-form"
import { SetterOrUpdater } from "recoil"

export const nicknameRules: (props: {
  signupDuplicate: SignupDuplicateState
  setSignupDuplicate: SetterOrUpdater<SignupDuplicateState>
}) => Omit<
  RegisterOptions<SignupHookFormData, "nickname">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> = ({ signupDuplicate, setSignupDuplicate }) => {
  return {
    required: true,
    validate: (nickname) => {
      const { format, length } = validatorInstance.validateNickname(nickname)

      if (!format()) {
        return false
      }
      if (!length()) {
        return false
      }

      return true
    },
    onChange(event) {
      if (signupDuplicate.nickname.checkedDuplicate) {
        setSignupDuplicate((prev) => ({
          ...prev,
          nickname: {
            ...duplicateDefaultState.nickname,
          },
        }))
      }
    },
  }
}

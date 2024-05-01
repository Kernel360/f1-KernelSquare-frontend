import { LoginFormData, SignupHookFormData } from "@/interfaces/form"
import { validatorInstance } from "@/util/validate"
import { RegisterOptions } from "react-hook-form"

type Domain = "login" | "signup"

type LoginRules = Omit<
  RegisterOptions<LoginFormData, "password">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>
type SignupRules = Omit<
  RegisterOptions<SignupHookFormData, "password">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const passwordRules: <T extends Domain>(
  domain: T,
) => T extends "signup" ? SignupRules : LoginRules = (domain) => ({
  required: true,
  validate: (password: string) => {
    const { format, length, allCheck } =
      validatorInstance.validatePassword(password)

    if (domain === "signup") {
      if (!format()) {
        return false
      }
      if (!length()) {
        return false
      }

      return true
    }

    return allCheck()
  },
})

import { SignupHookFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

export const passwordCheckRules: Omit<
  RegisterOptions<SignupHookFormData, "passwordCheck">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> = {
  required: true,
  validate: (passwordCheck, values) => {
    return values.password === passwordCheck
  },
}

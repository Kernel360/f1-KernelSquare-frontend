import Limitation from "@/constants/limitation"
import { validationMessage } from "@/constants/message/validation"
import { CoffeeChatFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type ChatContentRules = Omit<
  RegisterOptions<CoffeeChatFormData, "content">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const chatContentRules: ChatContentRules = {
  required: validationMessage.noContent,
  minLength: {
    value: Limitation.content_limit_under,
    message: validationMessage.underContentLimit,
  },
  maxLength: {
    value: Limitation.content_limit_over,
    message: validationMessage.overContentLimit,
  },
}

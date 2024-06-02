import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
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
    value: COFFEE_CHAT_LIMITS.content.minLength,
    message: validationMessage.chatContentLength,
  },
  maxLength: {
    value: COFFEE_CHAT_LIMITS.content.maxLength,
    message: validationMessage.chatContentLength,
  },
}

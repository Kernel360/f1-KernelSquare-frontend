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
    message: `소개글은 ${COFFEE_CHAT_LIMITS.content.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: COFFEE_CHAT_LIMITS.content.maxLength,
    message: `소개글은 ${COFFEE_CHAT_LIMITS.content.maxLength}자 이하여야 합니다`,
  },
}

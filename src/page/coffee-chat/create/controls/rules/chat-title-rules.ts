import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { validationMessage } from "@/constants/message/validation"
import { CoffeeChatFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type ChatTitleRules = Omit<
  RegisterOptions<CoffeeChatFormData, "title">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const chatTitleRules: ChatTitleRules = {
  required: validationMessage.notitle,
  minLength: {
    value: COFFEE_CHAT_LIMITS.title.minLength,
    message: "제목은 5자 이상 100자 이하여야 합니다.",
  },
  maxLength: {
    value: COFFEE_CHAT_LIMITS.title.maxLength,
    message: "제목은 5자 이상 100자 이하여야 합니다.",
  },
}

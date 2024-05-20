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
    value: Limitation.chat_content_min_length,
    message: validationMessage.chatContentLength,
  },
  maxLength: {
    value: Limitation.chat_content_max_length,
    message: validationMessage.chatContentLength,
  },
}

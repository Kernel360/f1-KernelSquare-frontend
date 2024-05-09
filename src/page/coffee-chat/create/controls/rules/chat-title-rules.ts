import Limitation from "@/constants/limitation"
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
    value: Limitation.title_limit_under,
    message: "제목은 5자 이상 100자 이하여야 합니다.",
  },
  maxLength: {
    value: Limitation.title_limit_over,
    message: "제목은 5자 이상 100자 이하여야 합니다.",
  },
}

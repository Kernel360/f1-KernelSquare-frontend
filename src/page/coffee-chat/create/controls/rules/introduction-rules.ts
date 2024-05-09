import Limitation from "@/constants/limitation"
import { CoffeeChatFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type ChatIntroductionRules = Omit<
  RegisterOptions<CoffeeChatFormData, "introduction">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const chatIntroductionRules: ChatIntroductionRules = {
  required: "커피챗 요약 글을 작성해주세요.",
  minLength: {
    value: Limitation.chat_introduction_limit_under,
    message: `커피챗 요약 글은 ${Limitation.chat_introduction_limit_under}자 이상 ${Limitation.chat_introduction_limit_over}자 이하여야 합니다.`,
  },
  maxLength: {
    value: Limitation.chat_introduction_limit_over,
    message: `커피챗 요약 글은 ${Limitation.chat_introduction_limit_under}자 이상 ${Limitation.chat_introduction_limit_over}자 이하여야 합니다.`,
  },
}

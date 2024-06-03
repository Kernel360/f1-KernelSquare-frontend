import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { CoffeeChatFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type ChatIntroductionRules = Omit<
  RegisterOptions<CoffeeChatFormData, "introduction">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const chatIntroductionRules: ChatIntroductionRules = {
  required: "커피챗 요약 글을 작성해주세요.",
  minLength: {
    value: COFFEE_CHAT_LIMITS.introduction.minLength,
    message: `커피챗 요약 글은 ${COFFEE_CHAT_LIMITS.introduction.minLength}자 이상 ${COFFEE_CHAT_LIMITS.introduction.maxLength}자 이하여야 합니다.`,
  },
  maxLength: {
    value: COFFEE_CHAT_LIMITS.introduction.maxLength,
    message: `커피챗 요약 글은 ${COFFEE_CHAT_LIMITS.introduction.minLength}자 이상 ${COFFEE_CHAT_LIMITS.introduction.maxLength}자 이하여야 합니다.`,
  },
}

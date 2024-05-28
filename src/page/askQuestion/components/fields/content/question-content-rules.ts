import { QUESTION_LIMITS } from "@/constants/limitation"
import { QuestionFormData } from "@/interfaces/form/question-form"
import { RegisterOptions } from "react-hook-form"

type QuestionContentRules = NonNullable<
  Omit<
    RegisterOptions<QuestionFormData, "content">,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >
>

export const enum QuestionContentValidateType {
  "NotAllowOnlySpace" = "notAllowOnlySpace",
}

export const questionContentRules: QuestionContentRules = {
  required: "본문을 입력해주세요",
  minLength: {
    value: QUESTION_LIMITS.content.minLength,
    message: `본문은 최소 ${QUESTION_LIMITS.content.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: QUESTION_LIMITS.content.maxLength,
    message: `본문은 최대 ${QUESTION_LIMITS.content.maxLength}자 이하여야 합니다`,
  },
  validate: {
    [QuestionContentValidateType.NotAllowOnlySpace]: (content) => {
      if (!content.trim().replaceAll(" ", "").length) {
        return "본문은 공백으로만 작성될 수 없습니다"
      }

      return true
    },
  },
}

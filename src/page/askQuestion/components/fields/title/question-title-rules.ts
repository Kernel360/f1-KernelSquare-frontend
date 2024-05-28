import { QUESTION_LIMITS } from "@/constants/limitation"
import { QuestionFormData } from "@/interfaces/form/question-form"
import { RegisterOptions } from "react-hook-form"

type QuestionTitleRules = Omit<
  RegisterOptions<QuestionFormData, "title">,
  "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
>

export const questionTitleRules: QuestionTitleRules = {
  required: "제목을 입력해주세요",
  validate: (title) => {
    if (!!title && !title.trim().length) {
      return "제목은 공백만 포함할 수 없습니다"
    }

    return true
  },
  minLength: {
    value: QUESTION_LIMITS.title.minLength,
    message: `제목은 최소 ${QUESTION_LIMITS.title.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: QUESTION_LIMITS.title.maxLength,
    message: `제목은 최대 ${QUESTION_LIMITS.title.maxLength}자 이하여야 합니다`,
  },
}

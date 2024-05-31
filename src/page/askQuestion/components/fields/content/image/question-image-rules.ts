import { QUESTION_LIMITS } from "@/constants/limitation"
import { QuestionFormData } from "@/interfaces/form/question-form"
import { UseFieldArrayProps } from "react-hook-form"

type QuestionImageFieldArrayRules = NonNullable<
  UseFieldArrayProps<QuestionFormData, "images", "id">["rules"]
>

export const questionImageFieldArrayRules: QuestionImageFieldArrayRules = {
  maxLength: {
    value: QUESTION_LIMITS.image.maxLength,
    message: `업로드 이미지는 ${QUESTION_LIMITS.image.maxLength}개 까지 가능합니다`,
  },
}

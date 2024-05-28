import { QUESTION_LIMITS } from "@/constants/limitation"
import { QuestionFormData } from "@/interfaces/form/question-form"
import { UseFieldArrayProps } from "react-hook-form"

type QuestionSkillFieldArrayRules = NonNullable<
  UseFieldArrayProps<QuestionFormData, "skills", "id">["rules"]
>

export const questionSkillFieldArrayRules: QuestionSkillFieldArrayRules = {
  maxLength: {
    value: QUESTION_LIMITS.skill.maxLength,
    message: `기술 태그는 최대 ${QUESTION_LIMITS.skill.maxLength}개 선택 가능합니다`,
  },
}

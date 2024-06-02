import { QUESTION_ANSWER_LIMITS } from "@/constants/limitation"
import { AnswerFormData } from "@/interfaces/form"
import { ControllerRenderProps, RegisterOptions } from "react-hook-form"

export type AnswerField = ControllerRenderProps<AnswerFormData, "answer">

export const enum AnswerValidateType {
  "NotAllowOnlySpace" = "notAllowOnlySpace",
}

export const answerRules: Omit<
  RegisterOptions<AnswerFormData, "answer">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> = {
  required: "답변 내용을 작성해주세요",
  minLength: {
    value: QUESTION_ANSWER_LIMITS.content.minLength,
    message: `답변은 ${QUESTION_ANSWER_LIMITS.content.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: QUESTION_ANSWER_LIMITS.content.maxLength,
    message: `답변은 ${new Intl.NumberFormat("ko-KR").format(
      QUESTION_ANSWER_LIMITS.content.maxLength,
    )}자 이하여야 합니다`,
  },
  validate: {
    [AnswerValidateType.NotAllowOnlySpace]: (answer) => {
      if (!answer.trim().replaceAll(" ", "").length)
        return "답변은 공백으로만 작성될 수 없습니다"

      return true
    },
  },
}

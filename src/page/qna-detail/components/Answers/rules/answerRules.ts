import Limitation, { QUESTION_ANSWER_LIMITS } from "@/constants/limitation"
import { validationMessage } from "@/constants/message/validation"
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
  required: validationMessage.noAnswerContent,
  minLength: {
    value: QUESTION_ANSWER_LIMITS.content.minLength,
    message: validationMessage.underAnswerLimit,
  },
  maxLength: {
    value: QUESTION_ANSWER_LIMITS.content.maxLength,
    message: validationMessage.overAnswerLimit,
  },
  validate: {
    [AnswerValidateType.NotAllowOnlySpace]: (answer) => {
      if (!answer.trim().replaceAll(" ", "").length)
        return "답변은 공백으로만 작성될 수 없습니다"

      return true
    },
  },
}

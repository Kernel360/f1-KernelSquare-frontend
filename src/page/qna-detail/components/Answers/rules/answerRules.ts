import Limitation from "@/constants/limitation"
import { AnswerFormData } from "@/interfaces/form"
import { ControllerRenderProps, RegisterOptions } from "react-hook-form"

export type AnswerField = ControllerRenderProps<AnswerFormData, "answer">

export const answerRules: Omit<
  RegisterOptions<AnswerFormData, "answer">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
> = {
  required: true,
  minLength: Limitation.answer_limit_under,
  maxLength: Limitation.answer_limit_over,
  validate: {
    whiteSpaceOnly: (answer) => {
      return !!answer.trim().length
    },
  },
}

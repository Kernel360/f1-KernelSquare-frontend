import { QuestionFormData } from "@/interfaces/form/question-form"
import {
  Control,
  useController,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { questionImageFieldArrayRules } from "../../components/fields/content/image/question-image-rules"

interface UseQuestionImageFieldArray {
  control?: Control<QuestionFormData, any>
}

export function useQuestionImageFieldArray({
  control,
}: UseQuestionImageFieldArray = {}) {
  const { control: contextControl } = useFormContext<QuestionFormData>()
  const { field } = useController({
    control: control ?? contextControl,
    name: "images",
    rules: questionImageFieldArrayRules,
  })
  const { fields, ...fieldArray } = useFieldArray({
    control: control ?? contextControl,
    name: "images",
    rules: questionImageFieldArrayRules,
  })

  return {
    fields: field.value,
    ...fieldArray,
  }
}

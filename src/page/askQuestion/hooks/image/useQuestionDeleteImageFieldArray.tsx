"use client"

import { useController, useFieldArray, useFormContext } from "react-hook-form"
import { QuestionFormData } from "@/interfaces/form/question-form"

export function useQuestionDeleteImageFieldArray() {
  const { control } = useFormContext<QuestionFormData>()
  const { field } = useController({ control, name: "imagesToDelete" })
  const { fields, ...fieldArray } = useFieldArray({
    control,
    name: "imagesToDelete",
  })

  return {
    fields: field.value,
    ...fieldArray,
  }
}

"use client"

import { AnswerFormData } from "@/interfaces/form"
import { Control, useController, useFieldArray } from "react-hook-form"

interface UseAnswerEditorDeleteImageFieldArray {
  control: Control<AnswerFormData, any>
}

export function useAnswerEditorDeleteImageFieldArray({
  control,
}: UseAnswerEditorDeleteImageFieldArray) {
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

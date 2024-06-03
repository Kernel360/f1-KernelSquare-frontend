"use client"

import { AnswerFormData } from "@/interfaces/form"
import { Control, useController, useFieldArray } from "react-hook-form"

interface UseAnswerEditorImageFieldArray {
  control: Control<AnswerFormData, any>
}

export function useAnswerEditorImageFieldArray({
  control,
}: UseAnswerEditorImageFieldArray) {
  const { field } = useController({ control, name: "images" })
  const { fields, ...fieldArray } = useFieldArray({
    control,
    name: "images",
  })

  return {
    fields: field.value,
    ...fieldArray,
  }
}

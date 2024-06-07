"use client"

import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"
import { useController, useFieldArray, useFormContext } from "react-hook-form"

export function useCoffeeChatHashTagFieldArray() {
  const { control } = useFormContext<CoffeeChatFormData>()

  const { field } = useController({ control, name: "hashTags" })
  const { fields, ...fieldArray } = useFieldArray({ control, name: "hashTags" })

  return {
    fields: field.value,
    ...fieldArray,
  }
}

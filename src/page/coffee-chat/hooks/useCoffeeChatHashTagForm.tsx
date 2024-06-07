"use client"

import { useController, useFormContext } from "react-hook-form"
import { useCoffeeChatHashTagFieldArray } from "./useCoffeeChatHashTagFieldArray"
import { hashTagRules } from "../create/controls/rules/hashtag-rules"
import { CoffeeChatFormContext } from "./useCoffeeChatFormContext"

export function useCoffeeChatHashTagForm() {
  const { fields } = useCoffeeChatHashTagFieldArray()

  const {
    hashTag: { control, ...hashTagFieldMethods },
  } = useFormContext() as CoffeeChatFormContext

  const { field } = useController({
    control,
    name: "hashTag",
    rules: hashTagRules({
      hashTagList: fields?.map((tag) => tag.content) ?? [],
    }),
  })

  return {
    hashTagField: field,
    ...hashTagFieldMethods,
  }
}

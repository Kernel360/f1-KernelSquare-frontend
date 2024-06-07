"use client"

import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"
import { Editor } from "@toast-ui/react-editor"
import { RefObject } from "react"
import { Control, UseFormReturn, useFormContext } from "react-hook-form"
import { useCoffeeChatHashTagFieldArray } from "./useCoffeeChatHashTagFieldArray"
import { useCoffeeChatDateTimeFieldArray } from "./useCoffeeChatDateTimeFieldArray"
import { HashTagFormData } from "@/interfaces/form"
import { useCoffeeChatHashTagForm } from "./useCoffeeChatHashTagForm"

export type CoffeeChatFormContext = UseFormReturn<
  CoffeeChatFormData,
  any,
  undefined
> & {
  editorRef: RefObject<Editor>
  hashTag: UseFormReturn<HashTagFormData, any, undefined> & {
    control: Control<HashTagFormData, any>
  }
}

export function useCoffeeChatFormContext() {
  const formContext =
    useFormContext<CoffeeChatFormData>() as CoffeeChatFormContext

  const hashTagFieldArray = useCoffeeChatHashTagFieldArray()
  const dateTimeFieldArray = useCoffeeChatDateTimeFieldArray()

  const { hashTagField, ...hashTagFieldMethods } = useCoffeeChatHashTagForm()

  const formReset = () => {
    formContext.editorRef?.current?.getInstance()?.reset()
    formContext.reset()

    hashTagFieldMethods.reset()
  }

  return {
    ...formContext,
    hashTagFieldArray,
    hashTag: {
      field: hashTagField,
      ...hashTagFieldMethods,
    },
    dateTimeFieldArray,
    formReset,
  }
}

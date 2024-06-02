"use client"

import { AnswerFormData } from "@/interfaces/form"
import { Editor } from "@toast-ui/react-editor"
import { RefObject } from "react"
import { UseFormReturn, useFormContext } from "react-hook-form"
import { useAnswerEditorImageFieldArray } from "./useAnswerImageFieldArray"
import { useAnswerEditorDeleteImageFieldArray } from "./useAnswerDeleteImageFieldArray"

type AnswerFormContext = UseFormReturn<AnswerFormData, any, undefined> & {
  editorRef: RefObject<Editor>
}

export function useAnswerFormContext() {
  const formContext = useFormContext<AnswerFormData>() as AnswerFormContext

  const imageFieldArray = useAnswerEditorImageFieldArray({
    control: formContext.control,
  })
  const deleteImageFieldArray = useAnswerEditorDeleteImageFieldArray({
    control: formContext.control,
  })

  const formReset = () => {
    formContext.editorRef?.current?.getInstance()?.reset()
    formContext.reset()
  }

  return {
    ...formContext,
    imageFieldArray,
    deleteImageFieldArray,
    formReset,
  }
}

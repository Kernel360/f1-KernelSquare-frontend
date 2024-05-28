"use client"

import {
  QuestionFormData,
  SearchSkillFormData,
} from "@/interfaces/form/question-form"
import { UseFormReturn, useFormContext } from "react-hook-form"
import { useQuestionImageFieldArray } from "./image/useQuestionImageFieldArray"
import { useQuestionSkillFieldArray } from "./useQuestionSkillFieldArray"
import { RefObject } from "react"
import { Editor } from "@toast-ui/react-editor"
import { useQuestionDeleteImageFieldArray } from "./image/useQuestionDeleteImageFieldArray"

type QuestionFormContext = UseFormReturn<QuestionFormData, any, undefined> & {
  editorRef: RefObject<Editor>
  searchSkillFormMethods: UseFormReturn<SearchSkillFormData, any, undefined>
}

export function useQuestionFormContext() {
  const formContext = useFormContext<QuestionFormData>() as QuestionFormContext

  const imageFieldArray = useQuestionImageFieldArray()
  const deleteImageFieldArray = useQuestionDeleteImageFieldArray()
  const skillFieldArray = useQuestionSkillFieldArray()

  const formId = "kernel-question-form"

  const formReset = () => {
    formContext.editorRef?.current?.getInstance()?.reset()

    formContext.reset()
    formContext.searchSkillFormMethods.reset()
  }

  return {
    ...formContext,
    imageFieldArray,
    deleteImageFieldArray,
    skillFieldArray,
    formId,
    formReset,
  }
}

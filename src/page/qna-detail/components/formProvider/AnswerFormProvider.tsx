"use client"

import { Answer } from "@/interfaces/answer"
import { AnswerFormData } from "@/interfaces/form"
import { Editor } from "@toast-ui/react-editor"
import { useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface AnswerFormProviderProps {
  answer?: Answer
  children: React.ReactNode
}

function AnswerFormProvider({ answer, children }: AnswerFormProviderProps) {
  const editorRef = useRef<Editor>(null)

  const methods = useForm<AnswerFormData>({
    defaultValues: answer
      ? {
          answer: answer.content,
          images: answer.answer_image_url
            ? [{ uploadURL: answer.answer_image_url }]
            : [],
          imagesToDelete: [],
        }
      : initialAnswerForm,
  })

  const providerProps = {
    editorRef,
    ...methods,
  }

  return <FormProvider {...providerProps}>{children}</FormProvider>
}

export default AnswerFormProvider

export const initialAnswerForm: AnswerFormData = {
  answer: "",
  images: [],
  imagesToDelete: [],
}

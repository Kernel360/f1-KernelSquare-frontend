"use client"

import { AnswerFormData } from "@/interfaces/form"
import { Editor } from "@toast-ui/react-editor"
import { useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface AnswerFormProviderProps {
  children: React.ReactNode
}

function AnswerFormProvider({ children }: AnswerFormProviderProps) {
  const editorRef = useRef<Editor>(null)

  const [defaultValues, setDefaultValues] =
    useState<AnswerFormData>(initialAnswerForm)

  const methods = useForm<AnswerFormData>({
    defaultValues: {
      ...defaultValues,
    },
  })

  const providerProps = {
    editorRef,
    defaultValues,
    setDefaultValues,
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

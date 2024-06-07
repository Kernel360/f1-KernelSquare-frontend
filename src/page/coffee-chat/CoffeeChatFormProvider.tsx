"use client"

import {
  CoffeeChatFormData,
  InitialCoffeeChat,
} from "@/interfaces/form/coffee-chat-form"
import { FormProvider, useForm } from "react-hook-form"
import { payloadToFormData } from "./utill/parser"
import { useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { HashTagFormData } from "@/interfaces/form"

interface CoffeeChatFormProviderProps {
  coffeeChat?: InitialCoffeeChat
  children: React.ReactNode
}

function CoffeeChatFormProvider({
  coffeeChat,
  children,
}: CoffeeChatFormProviderProps) {
  const editorRef = useRef<Editor>(null)

  const methods = useForm<CoffeeChatFormData>({
    defaultValues: coffeeChat
      ? {
          ...payloadToFormData(coffeeChat),
        }
      : initialCoffeeChatForm,
  })

  const { control: hashTagControl, ...hashTagFieldMethods } =
    useForm<HashTagFormData>({
      defaultValues: {
        hashTag: "",
      },
    })

  const providerProps = {
    editorRef,
    ...methods,
    hashTag: {
      control: hashTagControl,
      ...hashTagFieldMethods,
    },
  }

  return <FormProvider {...providerProps}>{children}</FormProvider>
}

export default CoffeeChatFormProvider

export const initialCoffeeChatForm: CoffeeChatFormData = {
  title: "",
  introduction: "",
  content: "",
  dateTimes: [],
  hashTags: [],
}

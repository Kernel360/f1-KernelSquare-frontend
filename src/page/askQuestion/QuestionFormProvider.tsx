"use client"

import { useClientSession } from "@/hooks/useClientSession"
import {
  QuestionFormData,
  SearchSkillFormData,
} from "@/interfaces/form/question-form"
import { getQuestion } from "@/service/question"
import { Editor } from "@toast-ui/react-editor"
import { useParams, usePathname } from "next/navigation"
import { useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"

interface QuestionFormProviderProps {
  children: React.ReactNode
}

function QuestionFormProvider({ children }: QuestionFormProviderProps) {
  const { user } = useClientSession()

  const pathname = usePathname()
  const params = useParams()

  const editorRef = useRef<Editor>(null)

  const searchSkillFormMethods = useForm<SearchSkillFormData>({
    defaultValues: {
      keyword: "",
    },
  })

  const methods = useForm<QuestionFormData>({
    defaultValues: async () => {
      if (pathname === "/question") {
        return emptyDefaultState
      }

      if (pathname.startsWith("/question/u/")) {
        if (!user) {
          return emptyDefaultState
        }

        const { data: questionPayload } = await getQuestion({
          id: Number(params.id),
        })

        if (questionPayload.data?.nickname !== user.nickname) {
          return emptyDefaultState
        }

        return {
          title: questionPayload.data.title,
          content: questionPayload.data.content,
          images: questionPayload.data.question_image_url
            ? [{ uploadURL: questionPayload.data.question_image_url }]
            : [],
          imagesToDelete: [],
          skills: questionPayload.data.skills
            ? [...questionPayload.data.skills.map((skill) => ({ skill }))]
            : [],
        }
      }

      return emptyDefaultState
    },
  })

  const providerProps = { editorRef, searchSkillFormMethods, ...methods }

  return <FormProvider {...providerProps}>{children}</FormProvider>
}

export default QuestionFormProvider

const emptyDefaultState: QuestionFormData = {
  title: "",
  content: "",
  images: [],
  imagesToDelete: [],
  skills: [],
}

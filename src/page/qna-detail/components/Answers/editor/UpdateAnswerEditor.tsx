"use client"

import Limitation from "@/constants/limitation"
import { Control, Controller } from "react-hook-form"
import { Answer } from "@/interfaces/answer"
import { useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import TextCounter from "@/components/shared/TextCounter"
import dynamic from "next/dynamic"
import { AnswerField, answerRules } from "../rules/answerRules"
import { AnswerFormData } from "@/interfaces/form"
import { EditorType } from "@toast-ui/editor"
import { useMutationState } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"

const MdEditor = dynamic(() => import("../../Markdown/MdEditor"), {
  ssr: false,
  loading(loadingProps) {
    return <div className="skeleton w-full h-[348px] rounded-sm" />
  },
})

interface UpdateAnswerEditorProps {
  control: Control<AnswerFormData, any>
  answer: Answer
}

function UpdateAnswerEditor({ control, answer }: UpdateAnswerEditorProps) {
  const editorRef = useRef<Editor>(null)

  const updateAnswerField =
    (field: AnswerField) => (editorType: EditorType) => {
      field.onChange(editorRef.current?.getInstance().getMarkdown() ?? "")
    }

  return (
    <Controller
      control={control}
      name="answer"
      defaultValue={answer.content}
      rules={answerRules}
      render={({ field, fieldState }) => {
        return (
          <div>
            <div className="relative">
              <MdEditor
                editorRef={editorRef}
                previous={answer.content}
                answerId={answer.answer_id}
                onChange={updateAnswerField(field)}
              />
              <UploadingIndicator />
            </div>
            <TextCounter
              text={field.value ?? ""}
              min={Limitation.answer_limit_under}
              max={Limitation.answer_limit_over}
            />
            <input
              hidden
              readOnly
              ref={field.ref}
              name={field.name}
              value={field.value}
            />
          </div>
        )
      }}
    />
  )
}

export default UpdateAnswerEditor

function UploadingIndicator() {
  const [uploadImageMutationStatus] = useMutationState({
    filters: {
      mutationKey: [queryKey.uploadImageMutation],
    },
    select(mutation) {
      return mutation.state.status
    },
  })

  if (uploadImageMutationStatus === "pending") {
    return (
      <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center bg-white/50 z-[31]">
        이미지 업로드 중...
      </div>
    )
  }

  return null
}

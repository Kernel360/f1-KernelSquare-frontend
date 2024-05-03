"use client"

import { AnswerFormData } from "@/interfaces/form"
import { Editor } from "@toast-ui/react-editor"
import dynamic from "next/dynamic"
import { useRef, memo } from "react"
import { Control, Controller } from "react-hook-form"
import { AnswerField, answerRules } from "../rules/answerRules"
import { EditorType } from "@toast-ui/editor"
import { useMutationState } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"

interface CreateAnswerEditorProps {
  control: Control<AnswerFormData, any>
  onEditorChange?: (markdown: string) => void
}

const MdEditor = dynamic(() => import("../../Markdown/MdEditor"), {
  ssr: false,
  loading(loadingProps) {
    return <div className="skeleton w-full h-[348px] rounded-sm" />
  },
})

function CreateAnswerEditor({
  control,
  onEditorChange,
}: CreateAnswerEditorProps) {
  const editorRef = useRef<Editor>(null)

  const updateAnswerField =
    (field: AnswerField) => (editorType: EditorType) => {
      const markdown = editorRef.current?.getInstance().getMarkdown() ?? ""

      field.onChange(markdown)
      onEditorChange && onEditorChange(markdown)
    }

  return (
    <Controller
      control={control}
      name="answer"
      rules={answerRules}
      render={({ field, fieldState }) => {
        return (
          <div className="relative">
            <MdEditor
              editorRef={editorRef}
              onChange={updateAnswerField(field)}
            />
            <UploadingIndicator />
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

export default memo(CreateAnswerEditor)

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

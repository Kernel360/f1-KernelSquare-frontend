"use client"

import { useController } from "react-hook-form"
import { answerRules } from "../rules/answerRules"
import ContentEditor from "@/page/askQuestion/components/editor/ContentEditor"
import ImageIndicator from "@/components/shared/toast-ui-editor/editor/ImageIndicator"
import { useToastEditorUploadImageHook } from "@/page/askQuestion/hooks/useToastEditorUploadImageHook"
import { QUESTION_ANSWER_LIMITS } from "@/constants/limitation"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"

function CreateAnswerEditor() {
  const { control, imageFieldArray, editorRef } = useAnswerFormContext()
  const { field } = useController({
    control,
    name: "answer",
    rules: answerRules,
  })

  const { uploadImageHook } = useToastEditorUploadImageHook({
    category: "answer",
    onUploadSuccess({ file, uploadURL }) {
      imageFieldArray.append({ file, uploadURL })
    },
    images: imageFieldArray.fields,
  })

  const placeholder = `답변을 작성해주세요 (${
    QUESTION_ANSWER_LIMITS.content.minLength
  }자 이상 ${new Intl.NumberFormat("ko-KR").format(
    QUESTION_ANSWER_LIMITS.content.maxLength,
  )}자 이하)`

  const onChange = () => {
    field.onChange(editorRef.current?.getInstance()?.getMarkdown() ?? "")
  }

  return (
    <div className="relative">
      <ContentEditor
        ref={editorRef}
        includeColorSyntaxPlugins
        placeholder={placeholder}
        onChange={onChange}
        hooks={{ addImageBlobHook: uploadImageHook }}
      />
      <ImageIndicator />
    </div>
  )
}

export default CreateAnswerEditor

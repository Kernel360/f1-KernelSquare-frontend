"use client"

import { useController } from "react-hook-form"
import { answerRules } from "../rules/answerRules"
import ContentEditor from "@/components/shared/toast-ui-editor/editor/ContentEditor"
import ImageIndicator from "@/components/shared/toast-ui-editor/editor/ImageIndicator"
import { useToastEditorUploadImageHook } from "@/hooks/editor/useToastEditorUploadImageHook"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import { ANSWER_EDITOR_PLACEHOLDER } from "@/constants/editor"

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

  const onChange = () => {
    field.onChange(editorRef.current?.getInstance()?.getMarkdown() ?? "")
  }

  return (
    <div className="relative">
      <ContentEditor
        ref={editorRef}
        includeColorSyntaxPlugins
        placeholder={ANSWER_EDITOR_PLACEHOLDER}
        onChange={onChange}
        hooks={{ addImageBlobHook: uploadImageHook }}
      />
      <ImageIndicator />
    </div>
  )
}

export default CreateAnswerEditor

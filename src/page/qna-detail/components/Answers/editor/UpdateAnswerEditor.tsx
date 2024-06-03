"use client"

import { QUESTION_ANSWER_LIMITS } from "@/constants/limitation"
import { useController } from "react-hook-form"
import TextCounter from "@/components/shared/TextCounter"
import { answerRules } from "../rules/answerRules"
import { EditorType } from "@toast-ui/editor"
import ContentEditor from "@/components/shared/toast-ui-editor/editor/ContentEditor"
import ImageIndicator from "@/components/shared/toast-ui-editor/editor/ImageIndicator"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import { ANSWER_EDITOR_PLACEHOLDER } from "@/constants/editor"
import { useToastEditorUploadImageHook } from "@/hooks/editor/useToastEditorUploadImageHook"

function UpdateAnswerEditor() {
  const {
    control,
    editorRef,
    imageFieldArray,
    formState: { defaultValues },
  } = useAnswerFormContext()

  const { field } = useController({
    control,
    name: "answer",
    rules: answerRules,
  })

  const { uploadImageHook } = useToastEditorUploadImageHook({
    category: "answer",
    images: imageFieldArray.fields,
    onUploadSuccess({ file, uploadURL }) {
      imageFieldArray.append({ file, uploadURL })
    },
  })

  const updateAnswerField = (editorType: EditorType) => {
    field.onChange(editorRef.current?.getInstance().getMarkdown() ?? "")
  }

  return (
    <div>
      <div className="relative">
        <ContentEditor
          ref={editorRef}
          includeColorSyntaxPlugins
          autofocus={true}
          placeholder={ANSWER_EDITOR_PLACEHOLDER}
          initialValue={defaultValues?.answer ?? ""}
          onChange={updateAnswerField}
          onLoad={() => {
            editorRef?.current?.getInstance()?.moveCursorToStart()
          }}
          hooks={{
            addImageBlobHook: uploadImageHook,
          }}
        />
        <ImageIndicator />
      </div>
      <TextCounter
        text={field.value ?? ""}
        min={QUESTION_ANSWER_LIMITS.content.minLength}
        max={QUESTION_ANSWER_LIMITS.content.maxLength}
      />
    </div>
  )
}

export default UpdateAnswerEditor

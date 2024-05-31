"use client"

import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import ContentEditor from "../../editor/ContentEditor"
import { useController } from "react-hook-form"
import { questionContentRules } from "./question-content-rules"
import TextCounter from "@/components/shared/TextCounter"
import { QUESTION_LIMITS } from "@/constants/limitation"
import { useToastEditorUploadImageHook } from "@/page/askQuestion/hooks/useToastEditorUploadImageHook"
import ImageIndicator from "@/components/shared/toast-ui-editor/editor/ImageIndicator"

function QuestionContentEditor() {
  const {
    control,
    imageFieldArray,
    editorRef,
    formState: { defaultValues },
  } = useQuestionFormContext()
  const { field } = useController({
    control,
    name: "content",
    rules: questionContentRules,
  })

  const { uploadImageHook } = useToastEditorUploadImageHook({
    category: "question",
    onUploadSuccess({ file, uploadURL }) {
      imageFieldArray.append({ file, uploadURL })
    },
    images: imageFieldArray.fields,
  })

  const placeholder = `질문 내용을 작성해주세요 (${
    QUESTION_LIMITS.content.minLength
  }자 이상 ${new Intl.NumberFormat("ko-KR").format(
    QUESTION_LIMITS.content.maxLength,
  )}자 이하)`

  const onChange = () => {
    field.onChange(editorRef.current?.getInstance()?.getMarkdown() ?? "")
  }

  return (
    <>
      <div ref={field.ref} className="relative" tabIndex={0}>
        <ContentEditor
          ref={editorRef}
          placeholder={placeholder}
          initialValue={defaultValues?.content}
          onChange={onChange}
          hooks={{ addImageBlobHook: uploadImageHook }}
        />
        <ImageIndicator />
      </div>
      <div className="flex w-full justify-end items-center mt-2">
        <TextCounter
          text={field.value}
          min={QUESTION_LIMITS.content.minLength}
          max={QUESTION_LIMITS.content.maxLength}
        />
      </div>
    </>
  )
}

export default QuestionContentEditor

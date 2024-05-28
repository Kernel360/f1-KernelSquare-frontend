"use client"

import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import ContentEditor from "../../editor/ContentEditor"
import { useController } from "react-hook-form"
import { questionContentRules } from "./question-content-rules"
import TextCounter from "@/components/shared/TextCounter"
import { QUESTION_LIMITS } from "@/constants/limitation"
import { useQuestionUploadImageHook } from "@/page/askQuestion/hooks/useQuestionUploadImageHook"
import { useMutationState } from "@tanstack/react-query"
import { UploadImagesCategory } from "@/interfaces/dto/upload/upload-images.dto"

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

  const { uploadImageHook } = useQuestionUploadImageHook({
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
        <ImageUploadIndicator />
        <ImageDeleteIndicator />
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

const ImageUploadIndicator = () => {
  const [uploadQuestionImageStatus] = useMutationState({
    filters: {
      mutationKey: ["upload", "question" as UploadImagesCategory],
    },
    select(mutation) {
      return mutation.state.status
    },
  })

  if (uploadQuestionImageStatus !== "pending") return null

  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center bg-white/50 z-[31]">
      이미지 업로드 중...
    </div>
  )
}

const ImageDeleteIndicator = () => {
  const [deleteQuestionImageStatus] = useMutationState({
    filters: {
      mutationKey: ["delete", "image"],
    },
    select(mutation) {
      return mutation.state.status
    },
  })

  if (deleteQuestionImageStatus !== "pending") return null

  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center bg-white/50 z-[31]">
      이미지 삭제 중...
    </div>
  )
}

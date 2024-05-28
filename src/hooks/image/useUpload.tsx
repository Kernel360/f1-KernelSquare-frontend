"use client"

import { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import {
  UploadImagesCategory,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"
import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import {
  ImageRuleValidateType,
  ImagesRuleValidateType,
  questionImageRules,
  questionImagesRules,
} from "@/page/askQuestion/components/fields/content/image/question-image-rules"
import { uploadImages } from "@/service/images"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export type UploadVariables = {
  file: File
  images?: ImageFieldArrayItem[]
  toastEditorHookCallback?: HookCallback
}

interface UseUpload {
  category: UploadImagesCategory
  onSuccess?: (
    data: AxiosResponse<UploadImagesResponse, any>,
    variables: UploadVariables,
    context: unknown,
  ) => void
  onError?: (
    error: Error | AxiosError,
    variables: UploadVariables,
    context: unknown,
  ) => void
  onValidateFileError?: (validateFileError: {
    type: ImagesRuleValidateType | ImageRuleValidateType
    message: string
  }) => void
}

/*
[TODO] 
  기존 useUploadImage 훅을 사용하는 곳에서
  현재 훅으로 사용하는 것으로 수정하고,
  useUploadImage 삭제
*/
export function useUpload({
  category,
  onSuccess,
  onError,
  onValidateFileError,
}: UseUpload) {
  const { mutate: uploadImageApi, status: uploadImageApiStatus } = useMutation({
    mutationKey: ["upload", category],
    mutationFn: ({ file, images }: UploadVariables) =>
      upload({ category, file, images }),
    onSuccess,
    onError(error, variables, context) {
      if (error instanceof Error && error.cause) {
        onValidateFileError &&
          onValidateFileError({
            type: error.cause as any,
            message: error.message,
          })

        return
      }

      onError && onError(error, variables, context)
    },
  })

  return {
    uploadImageApi,
    uploadImageApiStatus,
  }
}

const upload = async ({
  category,
  file,
  images,
}: {
  category: UploadImagesCategory
  file: File
  images?: ImageFieldArrayItem[]
}) => {
  for (const [validateType, validateFn] of Object.entries(
    questionImagesRules.validate,
  )) {
    const result = validateFn(images ?? [])
    if (result !== true) {
      throw new Error(result, { cause: validateType })
    }
  }

  for (const [validateType, validateFn] of Object.entries(
    questionImageRules.validate,
  )) {
    const result = validateFn(file)
    if (result !== true) {
      throw new Error(result, { cause: validateType })
    }
  }

  return uploadImages({ category, file })
}

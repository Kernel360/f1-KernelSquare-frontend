"use client"

import { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import { IMAGE_QUERY_KEY } from "@/constants/queryKey"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import {
  UploadImagesCategory,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"
import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import { uploadImages } from "@/service/images"
import {
  ImageRuleValidateType,
  ImagesRuleValidateType,
  imageRules,
  imagesRules,
} from "@/util/rules/image-rules"
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
  ) => ReturnSyncOrPromise
  onError?: (
    error: Error | AxiosError,
    variables: UploadVariables,
    context: unknown,
  ) => ReturnSyncOrPromise
  onValidateFileError?: (validateFileError: {
    type: ImagesRuleValidateType | ImageRuleValidateType
    message: string
  }) => ReturnSyncOrPromise
}

export function useUploadImage({
  category,
  onSuccess,
  onError,
  onValidateFileError,
}: UseUpload) {
  const { mutate: uploadImageApi, status: uploadImageApiStatus } = useMutation({
    mutationKey: IMAGE_QUERY_KEY.uploadImageWithCategory(category),
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
    imagesRules.validate,
  )) {
    const result = validateFn(images ?? [])
    if (result !== true) {
      throw new Error(result, { cause: validateType })
    }
  }

  for (const [validateType, validateFn] of Object.entries(
    imageRules.validate,
  )) {
    const result = validateFn(file)
    if (result !== true) {
      throw new Error(result, { cause: validateType })
    }
  }

  return uploadImages({ category, file })
}

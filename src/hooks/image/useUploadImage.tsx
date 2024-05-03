"use client"

import { uploadImages } from "@/service/images"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import type { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import type { APIResponse } from "@/interfaces/dto/api-response"
import type {
  UploadImagesCategory,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"

interface UploadImageVariables {
  category: UploadImagesCategory
  file: File
  uploadImageHookCallback?: HookCallback
}

interface useUploadImageOption {
  onSuccess?: (
    data: AxiosResponse<UploadImagesResponse, any>,
    variables: UploadImageVariables,
    context: unknown,
  ) => unknown
  onError?: (
    error: Error | AxiosError<APIResponse>,
    variables: UploadImageVariables,
    context: unknown,
  ) => unknown
}

export function useUploadImage({
  onSuccess,
  onError,
}: useUploadImageOption = {}) {
  const {
    mutate: uploadImageMutate,
    isPending: isUploadingImage,
    isError: isUploadImageError,
    isSuccess: isUploadImageSuccess,
  } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: ({
      category,
      file,
    }: {
      category: UploadImagesCategory
      file: File
    }) => uploadImages({ category, file }),
    onSuccess,
    onError,
  })

  return {
    uploadImage: uploadImageMutate,
    uploadImageStatus: {
      isUploadingImage,
      isUploadImageSuccess,
      isUploadImageError,
    },
  }
}

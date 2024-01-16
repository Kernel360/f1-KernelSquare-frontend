"use client"

import { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import { APIResponse } from "@/interfaces/dto/api-response"
import {
  UploadImagesCategory,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"
import { uploadImages } from "@/service/images"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

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

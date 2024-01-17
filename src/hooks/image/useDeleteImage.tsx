"use client"

import { APIResponse } from "@/interfaces/dto/api-response"
import { DeleteImagesResponse } from "@/interfaces/dto/upload/delete-images.dto"
import { deleteImages } from "@/service/images"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

type DeleteImageVariable = string

interface useDeleteImageOption {
  onSuccess?: (
    data: AxiosResponse<DeleteImagesResponse, any>,
    variables: DeleteImageVariable,
    context: unknown,
  ) => unknown
  onError?: (
    error: Error | AxiosError<APIResponse>,
    variables: DeleteImageVariable,
    context: unknown,
  ) => unknown
}

export function useDeleteImage({
  onSuccess,
  onError,
}: useDeleteImageOption = {}) {
  const {
    mutate: deleteImageMutate,
    isPending: isDeletingImage,
    isError: isDeleteImageError,
    isSuccess: isDeleteImageSuccess,
  } = useMutation({
    mutationFn: (imageUrl: DeleteImageVariable) => deleteImages({ imageUrl }),
    onSuccess,
    onError,
  })

  return {
    deleteImage: deleteImageMutate,
    deleteImageStatus: {
      isDeletingImage,
      isDeleteImageSuccess,
      isDeleteImageError,
    },
  }
}

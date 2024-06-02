"use client"

import { IMAGE_QUERY_KEY } from "@/constants/queryKey"
import { DeleteImagesResponse } from "@/interfaces/dto/upload/delete-images.dto"
import { deleteImages } from "@/service/images"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

type DeleteVariables = { imageUrl: string }

interface UseDelete {
  onSuccess?: (
    data: AxiosResponse<DeleteImagesResponse, any>,
    variables: DeleteVariables,
    context: unknown,
  ) => void
  onError?: (error: Error, variables: DeleteVariables, context: unknown) => void
}

export function useDeleteImage({ onSuccess, onError }: UseDelete = {}) {
  const { mutate, status } = useMutation({
    mutationKey: IMAGE_QUERY_KEY.deleteImage,
    mutationFn: ({ imageUrl }: DeleteVariables) => deleteImages({ imageUrl }),
    onSuccess,
    onError,
  })

  return {
    deleteImageApi: mutate,
    deleteImageApiStatus: status,
  }
}

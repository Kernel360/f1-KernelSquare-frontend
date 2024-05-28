"use client"

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

/*
[TODO] 
  기존 useDeleteImage 훅을 사용하는 곳에서
  현재 훅으로 사용하는 것으로 수정하고,
  useDeleteImage 삭제
*/
export function useDelete({ onSuccess, onError }: UseDelete = {}) {
  const { mutate, status } = useMutation({
    mutationKey: ["delete", "image"],
    mutationFn: ({ imageUrl }: DeleteVariables) => deleteImages({ imageUrl }),
    onSuccess,
    onError,
  })

  return {
    deleteImageApi: mutate,
    deleteImageApiStatus: status,
  }
}

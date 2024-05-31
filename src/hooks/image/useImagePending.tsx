"use client"

import { IMAGE_QUERY_KEY } from "@/constants/queryKey"
import { useMutationState } from "@tanstack/react-query"

export function useImagePending() {
  const mutations = useMutationState({
    filters: {
      status: "pending",
    },
    select(mutation) {
      const mutationKey = mutation.options.mutationKey

      if (!mutationKey) return null

      if (
        mutationKey
          .join(",")
          .startsWith(IMAGE_QUERY_KEY.uploadImageWithoutCategory.join(","))
      ) {
        return "uploadImage"
      }

      if (
        mutationKey.join(",").startsWith(IMAGE_QUERY_KEY.deleteImage.join(","))
      ) {
        return "deleteImage"
      }

      return null
    },
  })

  return {
    uploadImagePending: !!mutations.find((result) => result === "uploadImage"),
    deleteImagePending: !!mutations.find((result) => result === "deleteImage"),
  }
}

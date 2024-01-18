"use client"

import { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import { APIResponse } from "@/interfaces/dto/api-response"
import { UploadImagesCategory } from "@/interfaces/dto/upload/upload-images.dto"
import {
  fileUploadImageLinksSelector,
  questionEditorLoadedAtom,
} from "@/recoil/atoms/questionEditor"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { AxiosError, HttpStatusCode } from "axios"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useRecoilValue } from "recoil"
import { useUploadImage } from "./image/useUploadImage"

interface UseToastUiEditorImageUploadHookOption {
  category: UploadImagesCategory
  action?: "create" | "update"
  initialUploadLink?: string
  maximumUploadImageLength?: number
}

export const exceedingUploadableImagesError = new Error(
  "exceeding uploadable images",
  { cause: "exceeding uploadable images" },
)

const MAXIMUM_UPLOAD_IMAGE_LENGTH = 1

export function useToastUiEditorImageUploadHook({
  category,
  action,
  initialUploadLink,
  maximumUploadImageLength = MAXIMUM_UPLOAD_IMAGE_LENGTH,
}: UseToastUiEditorImageUploadHookOption) {
  const { uploadImage, uploadImageStatus } = useUploadImage({
    onSuccess(res, variables) {
      const { image_url } = res.data.data!
      const { file, uploadImageHookCallback } = variables

      if (uploadImageHookCallback) {
        uploadImageHookCallback(image_url, file.name)
      }

      addFileUploadImageLinks(image_url)
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          if (category === "question") {
            action === "create"
              ? revalidatePage("/question")
              : revalidatePage("/question/u/[id]", "page")

            return
          }

          toast.error("이미지 업로드에 실패했습니다", {
            position: "top-center",
          })

          return
        }

        toast.error("이미지 업로드에 실패했습니다", { position: "top-center" })
      }
    },
  })

  const { getFileUploadImageLinks, addFileUploadImageLinks } = useRecoilValue(
    fileUploadImageLinksSelector,
  )
  const formLoaded = useRecoilValue(questionEditorLoadedAtom)

  const uploadImageHook = async (blob: File | Blob, callback: HookCallback) => {
    const fileUploadLinkSnapshot = await getFileUploadImageLinks()

    try {
      if (fileUploadLinkSnapshot.length >= maximumUploadImageLength) {
        throw exceedingUploadableImagesError
      }

      uploadImage({
        category: category,
        file: blob as File,
        uploadImageHookCallback: callback,
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.cause === exceedingUploadableImagesError.cause) {
          toast.error(
            `이미지 파일 업로드는 최대${maximumUploadImageLength}장 가능합니다`,
            { position: "top-center" },
          )
        }

        return
      }

      toast.error("이미지 업로드에 실패했습니다", { position: "top-center" })
    }
  }

  useEffect(() => {
    if (initialUploadLink && formLoaded) {
      queueMicrotask(() => {
        addFileUploadImageLinks(initialUploadLink)
      })
    }
  }, [initialUploadLink, formLoaded]) /* eslint-disable-line */

  return {
    uploadImageHook,
    uploadImageStatus,
  }
}

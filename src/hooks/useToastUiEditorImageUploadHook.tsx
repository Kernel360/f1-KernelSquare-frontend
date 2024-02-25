"use client"

import { AxiosError, HttpStatusCode } from "axios"
import { useUploadImage } from "./image/useUploadImage"
import { useRecoilCallback } from "recoil"
import { questionEditorAtomFamily } from "@/recoil/atoms/questionEditor"
import type { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import type { APIResponse } from "@/interfaces/dto/api-response"
import type { UploadImagesCategory } from "@/interfaces/dto/upload/upload-images.dto"
import Limitation from "@/constants/limitation"

type SuccessCallbackArg = {
  file: File
  linkUrl: string
}
type UploadSuccessCallback =
  | ((arg: SuccessCallbackArg) => void)
  | ((arg: SuccessCallbackArg) => Promise<void>)

type UploadErrorCallbackArg = {
  error: Error | AxiosError<APIResponse<string>, any>
  action?: "create" | "update"
  errorCase?: "unauthorized"
}
type UploadErrorCallback =
  | ((arg: UploadErrorCallbackArg) => void)
  | ((arg: UploadErrorCallbackArg) => Promise<void>)

type ErrorCallbackArg = {
  error: unknown
  errorCase?: "isMaximum" | "isMaximumSize" | "notAllowedExtension"
}
type ErrorCallback =
  | ((arg: ErrorCallbackArg) => void)
  | ((arg: ErrorCallbackArg) => Promise<void>)

interface UseToastUiEditorImageUploadHookOption {
  atomKey?: string
  category: UploadImagesCategory
  action?: "create" | "update"
  maximumUploadImageLength?: number
  onUploadSuccess?: UploadSuccessCallback
  onUploadError?: UploadErrorCallback
  onError?: ErrorCallback
}

export const exceedingUploadableImagesError = new Error(
  "exceeding uploadable images",
  { cause: "exceeding uploadable images" },
)

export const exceedingUploadableImageSizeError = new Error(
  "exceeding uploadable image size",
  { cause: "exceeding uploadable image size" },
)

export const notAllowedUploadableExtension = new Error(
  "not allowed file extension",
  { cause: "not allowed file extension" },
)

export function useToastUiEditorImageUploadHook({
  atomKey,
  category,
  action,
  maximumUploadImageLength = Limitation.image.upload.maxLength,
  onUploadSuccess,
  onUploadError,
  onError,
}: UseToastUiEditorImageUploadHookOption) {
  const editorSnapshot = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const editorSnapshot = await snapshot.getPromise(
          questionEditorAtomFamily(atomKey ?? action ?? "create"),
        )

        return editorSnapshot
      },
    [atomKey],
  )

  const { uploadImage, uploadImageStatus } = useUploadImage({
    onSuccess(res, variables) {
      const { image_url } = res.data.data!
      const { file, uploadImageHookCallback } = variables

      if (uploadImageHookCallback) {
        uploadImageHookCallback(image_url, file.name)
      }

      onUploadSuccess && onUploadSuccess({ file, linkUrl: image_url })
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          onUploadError &&
            onUploadError({ error, action, errorCase: "unauthorized" })

          return
        }

        onUploadError && onUploadError({ error, action })

        return
      }

      onUploadError && onUploadError({ error, action })

      return
    },
  })

  const uploadImageHook = async (blob: File | Blob, callback: HookCallback) => {
    try {
      const { fileUploadImageLinks } = await editorSnapshot()

      if (fileUploadImageLinks.length >= maximumUploadImageLength) {
        throw exceedingUploadableImagesError
      }

      if ((blob as File)?.size && blob.size > Limitation.image.size) {
        throw exceedingUploadableImageSizeError
      }

      if (
        (blob as File)?.type &&
        !Limitation.image.extension.isValidExtendsion(blob.type)
      ) {
        throw notAllowedUploadableExtension
      }

      uploadImage({
        category: category,
        file: blob as File,
        uploadImageHookCallback: callback,
      })
    } catch (error) {
      if (error instanceof Error) {
        if (error.cause === exceedingUploadableImagesError.cause) {
          onError && onError({ error, errorCase: "isMaximum" })
          return
        }

        if (error.cause === exceedingUploadableImageSizeError.cause) {
          onError && onError({ error, errorCase: "isMaximumSize" })
          return
        }

        if (error.cause === notAllowedUploadableExtension.cause) {
          onError && onError({ error, errorCase: "notAllowedExtension" })
          return
        }

        onError && onError({ error })

        return
      }

      onError && onError({ error })
    }
  }

  return {
    uploadImageHook,
    uploadImageStatus,
  }
}

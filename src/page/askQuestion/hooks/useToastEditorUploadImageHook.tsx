"use client"

import { HookCallback } from "@/components/shared/toast-ui-editor/editor/EditorWrapper"
import { useDomainEditMode } from "@/hooks/editor/useDomainEditMode"
import { UploadVariables, useUpload } from "@/hooks/image/useUpload"
import { APIResponse } from "@/interfaces/dto/api-response"
import { UploadImagesCategory } from "@/interfaces/dto/upload/upload-images.dto"
import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { AxiosError, HttpStatusCode } from "axios"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

interface UseToastEditorUploadImageHook {
  category: Exclude<UploadImagesCategory, "level">
  images?: ImageFieldArrayItem[]
  onUploadSuccess?: (payload: { file: File | Blob; uploadURL: string }) => void
  onUploadError?: (
    error: Error | AxiosError,
    variables: UploadVariables,
    context: unknown,
  ) => void
}

/*
  [TODO]
  토스트 에디터 이미지 훅을 해당 훅 하나를 이용해서
  범용적으로 이용할 수 있도록 수정
*/
export function useToastEditorUploadImageHook({
  category,
  images,
  onUploadSuccess,
  onUploadError,
}: UseToastEditorUploadImageHook) {
  const mode = useDomainEditMode()

  const imagesRef = useRef(images)

  const { uploadImageApi } = useUpload({
    category,
    onSuccess(response, { file, toastEditorHookCallback }) {
      const uploadURL = response.data.data!.image_url

      onUploadSuccess && onUploadSuccess({ file, uploadURL })

      toastEditorHookCallback &&
        toastEditorHookCallback(
          uploadURL,
          (
            document.getElementById(
              "toastuiAltTextInput",
            ) as HTMLInputElement | null
          )?.value || file.name,
        )
    },
    onError(error, variables, context) {
      onUploadError && onUploadError(error, variables, context)

      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          revalidatePage(
            mode === "create" ? "/question" : "/question/u/[id]",
            "page",
          ).then(() => {
            setTimeout(() => {
              toast.error("로그인 후 다시 작성해주세요", {
                position: "top-center",
              })
            }, 400)
          })

          return
        }

        toast.error(
          response?.data.msg ?? "이미지 업로드 중 에러가 발생했습니다",
          {
            position: "top-center",
            toastId: "uploadImageApiError",
          },
        )

        return
      }

      toast.error("이미지 업로드 중 에러가 발생했습니다", {
        position: "top-center",
        toastId: "uploadImageError",
      })
    },
    onValidateFileError(validateFileError) {
      toast.error(validateFileError.message, {
        position: "top-center",
        toastId: `uploadImageValidate:${validateFileError.type}`,
      })
    },
  })

  const uploadImageHook = (blob: File | Blob, callback: HookCallback) => {
    uploadImageApi({
      file: blob as File,
      toastEditorHookCallback: callback,
      images: imagesRef.current,
    })
  }

  useEffect(() => {
    imagesRef.current = images
  }, [images])

  return {
    uploadImageHook,
  }
}

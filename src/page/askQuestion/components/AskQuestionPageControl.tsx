"use client"

import Button from "@/components/shared/button/Button"
import { useLayoutEffect, useRef } from "react"
import useModal from "@/hooks/useModal"
import CancelAskQuestionModal from "./CancelAskQuestionModal"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  questionEditorAtomFamily,
  questionEditorLoadedAtomFamily,
} from "@/recoil/atoms/questionEditor"
import Image from "next/image"
import { MdClose } from "react-icons/md"
import { toast } from "react-toastify"
import CancelUploadImageModal from "../CancelUploadImage"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import { Editor } from "@toast-ui/react-editor"
import { AxiosError, HttpStatusCode } from "axios"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { DELETE_IMAGE_LOCAL_STORAGE_KEY } from "@/constants/editor"
import type { APIResponse } from "@/interfaces/dto/api-response"

export type EditMode = "create" | "update"

interface AskQuestionPageControlProps {
  questionId?: number
  editMode?: EditMode
  initialUploadImages?: Array<string>
}

export interface DeleteImageLinkFromMarkdownPayload {
  targetLink: string
}
export interface SendEditorRefPayload {
  ref: Editor | null
}

export const deleteImageLinkFromMarkdownEventName =
  "deleteImageLinkFormMarkDown"
export const sendEditorRefEventName = "sendToastUiEditorRef"

function AskQuestionPageControl({
  questionId,
  editMode = "create",
  initialUploadImages,
}: AskQuestionPageControlProps) {
  const editorRef = useRef<Editor | null>(null)

  const { openModal, closeModal } = useModal()

  const { fileUploadImageLinks } = useRecoilValue(
    questionEditorAtomFamily(editMode),
  )

  const form = document.querySelector("form")!
  const formLoaded = useRecoilValue(questionEditorLoadedAtomFamily(editMode))

  const onSubmit = () => {
    form.requestSubmit()
  }

  const onCancel = () => {
    openModal({
      containsHeader: true,
      content: (
        <CancelAskQuestionModal questionId={questionId} editMode={editMode} />
      ),
    })
  }

  useLayoutEffect(() => {
    const assignRef = (e: CustomEvent) => {
      const { ref } = e.detail as SendEditorRefPayload

      editorRef.current = ref
    }

    window.addEventListener(sendEditorRefEventName as any, assignRef)
    return () => {
      window.removeEventListener(sendEditorRefEventName as any, assignRef)

      closeModal()
    }
  }, []) /* eslint-disable-line */

  return !formLoaded ? null : (
    <aside className="order-1 lgDevice:order-2 sticky justify-self-start z-[1] bg-[#f7f9fc] box-border p-0 lgDevice:py-4 top-[calc(var(--height-header)+67px)] sm:top-[calc(var(--height-header))] lgDevice:top-[calc(var(--height-header)+150px)] h-max w-full lgDevice:w-32 lgDevice:self-start lgDevice:mr-4 shadow-md rounded-none lgDevice:rounded-md">
      <div className="relative flex flex-row lgDevice:flex-col gap-4 w-full h-full justify-between items-center box-border p-2 lgDevice:p-0">
        {/* file uploaded image */}
        <UploadedImageList
          srcList={fileUploadImageLinks}
          initialUploadImages={initialUploadImages}
          editMode={editMode}
          editorRef={editorRef.current}
        />
        <div className="flex gap-2 flex-row justify-center items-center lgDevice:flex-col">
          <Button buttonTheme="primary" className="w-[68px]" onClick={onSubmit}>
            {editMode === "create" ? "질문 작성" : "질문 수정"}
          </Button>
          <Button
            buttonTheme="secondary"
            className="w-[68px]"
            onClick={onCancel}
          >
            {editMode === "create" ? "작성 취소" : "수정 취소"}
          </Button>
        </div>
      </div>
    </aside>
  )
}

// uploadImage
function UploadedImageList({
  srcList,
  initialUploadImages,
  editMode,
  editorRef,
}: {
  srcList: Array<string>
  initialUploadImages?: Array<string>
  editMode: EditMode
  editorRef: Editor | null
}) {
  if (!srcList.length) {
    return <div className="text-center">업로드 이미지 없음</div>
  }

  return (
    <ul className="flex gap-3 w-full overflow-x-auto lgDevice:flex-col lgDevice:overflow-y-auto lgDevice:max-h-[5rem]">
      {srcList.map((src) => {
        return (
          <li key={src} className="lgDevice:mx-auto">
            <UploadedImage
              src={src}
              initialUploadImages={initialUploadImages}
              editMode={editMode}
              editorRef={editorRef}
            />
          </li>
        )
      })}
    </ul>
  )
}

function UploadedImage({
  src,
  initialUploadImages,
  editMode,
  editorRef,
}: {
  src: string
  initialUploadImages?: Array<string>
  editMode: EditMode
  editorRef: Editor | null
}) {
  const { openModal, closeModal } = useModal()

  const setEditorState = useSetRecoilState(questionEditorAtomFamily(editMode))

  const removeFileUploadLinks = async (imageUrl: string) => {
    setEditorState((prev) => ({
      ...prev,
      fileUploadImageLinks: prev.fileUploadImageLinks.filter(
        (uploadedImageUrl) => uploadedImageUrl !== imageUrl,
      ),
    }))

    queueMicrotask(() => {
      window.dispatchEvent(
        new CustomEvent(deleteImageLinkFromMarkdownEventName, {
          detail: {
            targetLink: imageUrl,
          } as DeleteImageLinkFromMarkdownPayload,
        }),
      )
    })
  }

  // delete image 관련
  const { deleteImage, deleteImageStatus } = useDeleteImage({
    async onSuccess(res, imageUrl) {
      removeFileUploadLinks(imageUrl)
    },
    onError(error, imageUrl) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          editMode === "create"
            ? revalidatePage("/question")
            : revalidatePage("/question/u/[id]", "page")

          return
        }
      }

      toast.error("이미지 삭제에 실패했습니다", {
        position: "bottom-center",
      })
    },
  })

  const handleDeleteImage = async (imageUrl: string) => {
    try {
      if (initialUploadImages?.includes(src)) {
        const deleteImageListStorage = localStorage.getItem(
          DELETE_IMAGE_LOCAL_STORAGE_KEY,
        )

        if (!deleteImageListStorage) {
          localStorage.setItem(
            DELETE_IMAGE_LOCAL_STORAGE_KEY,
            JSON.stringify([imageUrl]),
          )
        } else {
          const list = Array.from(
            new Set([...JSON.parse(deleteImageListStorage), imageUrl]),
          )
          localStorage.setItem(
            DELETE_IMAGE_LOCAL_STORAGE_KEY,
            JSON.stringify(list),
          )
        }

        removeFileUploadLinks(imageUrl)

        return
      }

      deleteImage(imageUrl)
    } catch (error) {
      toast.error("이미지 삭제에 실패했습니다", {
        position: "bottom-center",
      })
    }
  }

  const deleteImageConfirm = (imageUrl: string) => {
    if (deleteImageStatus.isDeletingImage) return

    openModal({
      containsHeader: false,
      closeableDim: false,
      content: (
        <CancelUploadImageModal
          imageUrl={imageUrl}
          initialUploadImages={initialUploadImages}
          editMode={editMode}
          onAgree={() => {
            handleDeleteImage(imageUrl)
            closeModal()
          }}
          onCancel={closeModal}
        />
      ),
    })
  }

  // 업로드 이미지 클릭시 본문에 추가
  const appendImageToMarkdownContent = () => {
    const currentInstance = editorRef?.getInstance()

    const currentMarkdown = currentInstance?.getMarkdown()
    currentInstance?.setMarkdown(`${currentMarkdown}\n![upload_image](${src})`)
  }

  return (
    <div className="relative w-max px-2 flex justify-center">
      <div className="cursor-pointer group relative w-20 aspect-square rounded-lg overflow-hidden">
        <Image
          src={src}
          alt="img"
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <div
          className="transition-opacity cursor-pointer absolute flex justify-center items-center w-full h-full left-0 top-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:bg-white/40"
          onClick={appendImageToMarkdownContent}
        >
          <span className="py-1 px-2 bg-primary text-white text-xs">
            본문에 추가
          </span>
        </div>
      </div>
      <Button
        className="flex gap-1 justify-center items-center absolute w-full top-0 left-0 shadow-lg bg-white hover:bg-colorsGray"
        onClick={() => deleteImageConfirm(src)}
      >
        <span className="text-xs w-max">업로드 취소</span>
        <div className="flex justify-center items-center rounded-full w-4 h-4 p-1.5 box-border shrink-0 bg-colorsLightGray shadow-md">
          <MdClose className={"shrink-0 text-xs"} />
        </div>
      </Button>
    </div>
  )
}

export default AskQuestionPageControl

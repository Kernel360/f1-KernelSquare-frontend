"use client"

import useModal from "@/hooks/useModal"
import UploadedImage from "./ui/UploadedImage"
import { RenderUploadedImageProps } from "./ui/UploadedImages"
import { toast } from "react-toastify"
import ConfirmDeleteImageModal from "@/page/askQuestion/components/fields/content/image/ConfirmDeleteImageModal"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"

interface UploadedAnswerImageProps extends RenderUploadedImageProps {}

function UploadedAnswerImage({
  image,
  imageIndex,
  isInitialImage,
  editor,
}: UploadedAnswerImageProps) {
  const { openModal, closeModal } = useModal()

  const { imageFieldArray, deleteImageFieldArray } = useAnswerFormContext()
  const { deleteImageApi, deleteImageApiStatus } = useDeleteImage({
    onSuccess() {
      imageFieldArray.remove(imageIndex)
    },
  })

  const onDelete = () => {
    openModal({
      containsHeader: false,
      content: (
        <ConfirmDeleteImageModal
          isInitialUploadImage={isInitialImage}
          deleteImageUrl={image.uploadURL}
          onAgree={() => {
            if (isInitialImage) {
              deleteImageFieldArray.append({ ...image })
              imageFieldArray.remove(imageIndex)

              closeModal()
              return
            }

            if (deleteImageApiStatus === "pending") return

            deleteImageApi({ imageUrl: image.uploadURL })
            closeModal()
          }}
          onCancel={closeModal}
        />
      ),
    })
  }

  const onAddLinkToContent = () => {
    const currentEditorInstance = editor?.getInstance()

    const markdown = currentEditorInstance?.getMarkdown()

    currentEditorInstance?.setMarkdown(
      `${markdown}\n![upload_image](${image.uploadURL})`,
    )

    toast.info("이미지 링크를 본문에 추가했습니다", {
      position: "top-center",
      toastId: "addLinkToContent",
    })
  }

  return (
    <UploadedImage
      image={image}
      onDelete={onDelete}
      onAddLinkToContent={onAddLinkToContent}
    />
  )
}

export default UploadedAnswerImage

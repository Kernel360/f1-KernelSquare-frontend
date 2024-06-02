"use client"

import Button from "@/components/shared/button/Button"
import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import { MdClose } from "react-icons/md"
import ConfirmDeleteImageModal from "./ConfirmDeleteImageModal"
import useModal from "@/hooks/useModal"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import { toast } from "react-toastify"

interface UploadImageControlProps {
  image: ImageFieldArrayItem
  imageIndex: number
}

function UploadImageControl({ image, imageIndex }: UploadImageControlProps) {
  return (
    <>
      <div className="absolute right-0.5 top-0.5">
        <DeleteUploadImageButton image={image} imageIndex={imageIndex} />
      </div>
      <div className="absolute left-0 bottom-0 w-full flex bg-black/40">
        <AddLinkToContentButton image={image} />
      </div>
    </>
  )
}

export default UploadImageControl

const DeleteUploadImageButton = ({
  image,
  imageIndex,
}: {
  image: ImageFieldArrayItem
  imageIndex: number
}) => {
  const { openModal, closeModal } = useModal()

  const {
    imageFieldArray,
    deleteImageFieldArray,
    formState: { defaultValues },
  } = useQuestionFormContext()

  const { deleteImageApi, deleteImageApiStatus } = useDeleteImage({
    onSuccess() {
      imageFieldArray.remove(imageIndex)
    },
  })

  const initialUploadImages = defaultValues?.images
  const isInitialUploadImage =
    !!initialUploadImages?.length &&
    !!initialUploadImages.find(
      (initialUploadImage) => initialUploadImage!.uploadURL === image.uploadURL,
    )

  const deleteUploadImage = () => {
    if (isInitialUploadImage) {
      deleteImageFieldArray.append({ ...image })
      imageFieldArray.remove(imageIndex)

      closeModal()
      return
    }

    if (deleteImageApiStatus === "pending") return

    deleteImageApi({ imageUrl: image.uploadURL })
    closeModal()
  }

  const confirmDeleteImage = () => {
    openModal({
      containsHeader: false,
      content: (
        <ConfirmDeleteImageModal
          isInitialUploadImage={isInitialUploadImage}
          deleteImageUrl={image.uploadURL}
          onAgree={deleteUploadImage}
          onCancel={closeModal}
        />
      ),
    })
  }

  return (
    <Button
      className="p-0.5 bg-black/40 rounded-full text-white pointerhover:hover:text-danger pointerhover:hover:bg-white"
      onClick={confirmDeleteImage}
    >
      <MdClose />
    </Button>
  )
}

const AddLinkToContentButton = ({ image }: { image: ImageFieldArrayItem }) => {
  const { editorRef } = useQuestionFormContext()

  const appendImageToMarkdownContent = () => {
    const currentEditorInstance = editorRef.current?.getInstance()

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
    <Button
      className="p-0 w-full text-xs rounded-none text-white pointerhover:hover:text-primary pointerhover:hover:bg-white"
      onClick={appendImageToMarkdownContent}
    >
      주소 삽입
    </Button>
  )
}

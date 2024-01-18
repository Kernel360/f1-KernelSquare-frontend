import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { uploadImages } from "@/service/images"
import { updateMemberInfo } from "@/service/member"
import { useState, type ChangeEvent, type RefObject } from "react"
import { toast } from "react-toastify"
import type {
  SaveImageProps,
  UseProfileImageProps,
} from "./useProfileImage.types"

const useProfileImage = ({ image_url }: UseProfileImageProps) => {
  const { user, clientSessionUpdate } = useClientSession()
  const { openModal } = useModal()
  const [image, setImage] = useState<string | ArrayBuffer | null>(image_url)
  const [preview, setPreview] = useState<string>("")

  const handleSaveImage = async ({ image, memberId }: SaveImageProps) => {
    const onSuccess = async () => {
      try {
        const imageUploadResponse = await uploadImages({
          category: "member",
          file: image,
        })
        console.log("upload", imageUploadResponse)

        const infoUpdateResponse = await updateMemberInfo({
          id: memberId,
          image_url: imageUploadResponse.data.data?.image_url,
        })
        console.log("res", infoUpdateResponse)
        if (infoUpdateResponse.data.code === 1242) {
          toast.success(successMessage.editProfileImage, {
            position: "top-center",
          })
          clientSessionUpdate({
            image_url: imageUploadResponse.data.data?.image_url,
          })
        }
      } catch (error) {
        toast.error(errorMessage.failToUploadImage, {
          position: "top-center",
        })
        console.error("Error", error)
      }
    }

    const onCancel = () => {
      toast.error(notificationMessage.cancleUploadImage, {
        position: "top-center",
      })
    }

    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="uploadProfileImage"
        />
      ),
    })
  }

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    memberId: number,
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]

      setPreview((prevPreview) => {
        if (prevPreview) {
          URL.revokeObjectURL(prevPreview)
        }

        return URL.createObjectURL(file)
      })

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        setImage(reader.result || null)

        handleSaveImage({ image: file, memberId })
      }
    }
  }

  const handleUpload = (imageUploadRef: RefObject<HTMLInputElement>) => {
    const fileInput = imageUploadRef?.current
    if (fileInput) fileInput.click()
  }

  return {
    user,
    handleSaveImage,
    handleUpload,
    image,
    setImage,
    preview,
    setPreview,
    handleImageChange,
  }
}

export default useProfileImage

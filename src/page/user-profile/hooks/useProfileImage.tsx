import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { errorMessage } from "@/constants/message/error"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { uploadImages } from "@/service/images"
import { useState, type ChangeEvent, type RefObject } from "react"
import { toast } from "react-toastify"
import queryKey from "@/constants/queryKey"
import { useQueryClient } from "@tanstack/react-query"
import { memberQueries } from "@/react-query/member"
import Limitation from "@/constants/limitation"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import cancleMessage from "@/constants/message/cancle"
import successMessage from "@/constants/message/success"
import { validationMessage } from "@/constants/message/validation"

export interface SaveImageProps {
  image: File
  memberId: number
}

export interface ResetImageProps {}

const useProfileImage = (image_url: string | null) => {
  const { user, clientSessionUpdate } = useClientSession()
  const { openModal } = useModal()
  const { deleteImage } = useDeleteImage()
  const [image, setImage] = useState<string | ArrayBuffer | null>(image_url)
  const [preview, setPreview] = useState<string>("")
  const queryClient = useQueryClient()
  const { updateMemberProfileImage } =
    memberQueries.useUpdateMemberProfileImage()

  const handleSaveImage = async ({ image, memberId }: SaveImageProps) => {
    const onSuccess = async () => {
      try {
        const imageUploadResponse = await uploadImages({
          category: "member",
          file: image,
        })
        updateMemberProfileImage(
          {
            memberId: memberId,
            image_url: imageUploadResponse.data.data?.image_url,
          },
          {
            onSuccess: () => {
              toast.success(successMessage.editProfileImage, {
                position: "top-center",
                toastId: "successToUploadProfileImage",
              })
              clientSessionUpdate({
                image_url: imageUploadResponse.data.data?.image_url,
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.user, queryKey.profile, memberId],
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.question],
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.answer],
              })
            },
          },
        )
      } catch (error) {
        toast.error(errorMessage.uploadImage, {
          position: "top-center",
          toastId: "failToUploadProfileImage",
        })
      }
    }

    const onCancel = () => {
      toast.error(cancleMessage.uploadImage, {
        position: "top-center",
        toastId: "cancleUploadProfileImage",
      })
    }

    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="editProfileImage"
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

      // 파일 용량 제한
      if (file.size > Limitation.image.size) {
        toast.error(validationMessage.imageLimitOver, {
          position: "top-center",
          toastId: "profileImageLimitOver",
        })
        return
      }

      // 파일 확장자 제한
      if (
        !file.type.includes("png") &&
        !file.type.includes("svg") &&
        !file.type.includes("jpeg") &&
        !file.type.includes("gif")
      ) {
        toast.error(validationMessage.invalidImageExtension, {
          position: "top-center",
          toastId: "invalidImageExtension",
        })
        return
      }

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

  const handleResetImage = async (memberId: number) => {
    const onSuccess = async () => {
      const previousImage = image_url
      try {
        updateMemberProfileImage(
          {
            memberId: memberId,
            image_url: null,
          },
          {
            onSuccess: () => {
              if (previousImage) deleteImage(previousImage)
              toast.success(successMessage.editResetProfileImage, {
                position: "top-center",
                toastId: "successToResetProfileImage",
              })
              clientSessionUpdate({
                image_url: null,
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.user, queryKey.profile, memberId],
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.question],
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.answer],
              })
            },
          },
        )
      } catch (error) {
        toast.error(errorMessage.resetImage, {
          position: "top-center",
          toastId: "failToResetProfileImage",
        })
        console.error("Error", error)
      }
    }

    const onCancel = () => {
      toast.error(cancleMessage.resetImage, {
        position: "top-center",
        toastId: "cancleResetProfileImage",
      })
    }

    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="resetProfileImage"
        />
      ),
    })
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
    handleResetImage,
  }
}

export default useProfileImage

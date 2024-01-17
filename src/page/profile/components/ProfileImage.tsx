"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"
import type { ImageProps } from "../MyPage.type"
import Image from "next/image"
import { updateMemberInfo } from "@/service/member"
import { toast } from "react-toastify"
import {
  notificationMessage,
  errorMessage,
  successMessage,
} from "@/constants/message"
import { Icons } from "@/components/icons/Icons"
import { uploadImages } from "@/service/images"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { useClientSession } from "@/hooks/useClientSession"
import AuthGuardModal from "@/components/shared/auth-modal/AuthGuardModal"

function ProfileImage({ id, image_url }: ImageProps) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(image_url)
  const [preview, setPreview] = useState<string>("")
  const imageUploadRef = useRef<HTMLInputElement>(null)
  const { user, clientSessionUpdate } = useClientSession()

  const { openModal } = useModal()

  const handleSaveImage = async (image: File) => {
    const onSuccess = async () => {
      try {
        const imageUploadResponse = await uploadImages({
          category: "member",
          file: image,
        })
        console.log("upload", imageUploadResponse)

        const infoUpdateResponse = await updateMemberInfo({
          id,
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
        toast.error(errorMessage.failToUploadImage)
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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

        handleSaveImage(file)
      }
    }
  }

  const handleUpload = () => {
    const fileInput = imageUploadRef?.current
    if (fileInput) fileInput.click()
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, []) /* eslint-disable-line */

  if (!user) return <AuthGuardModal page="profile" />

  return (
    <div>
      <div className="w-[150px] h-[150px] relative">
        {typeof image === "string" && <ImageArea image={user?.image_url} />}
      </div>
      <Spacing size={10} />
      <input
        type="file"
        ref={imageUploadRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />
      <Button
        type="button"
        buttonTheme="primary"
        className="w-[150px] h-[30px]"
        onClick={handleUpload}
      >
        프로필 변경
      </Button>
    </div>
  )
}

export default ProfileImage

const ImageArea: React.FC<{ image: string }> = ({ image }) => {
  if (!image)
    return (
      <Icons.UserProfile className="w-[150px] h-[150px] fill-colorsGray shrink-0" />
    )

  return (
    <Image
      src={image}
      alt="프로필이미지"
      fill
      className="object-cover rounded-full"
    />
  )
}

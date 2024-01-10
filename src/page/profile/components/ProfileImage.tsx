"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"
import type { ImageProps } from "../MyPage.type"
import Image from "next/image"
import { updateMemberInfo } from "@/service/member"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import {
  confirmMessage,
  notificationMessage,
  toastifyMessage,
} from "@/constants/message"
import { Icons } from "@/components/icons/Icons"
import { uploadImages } from "@/service/images"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import useModal from "@/hooks/useModal"
import UploadProfileImageModal from "@/components/shared/confirm-modal/components/UploadProfileImageModal"

function ProfileImage({ id, image_url }: ImageProps) {
  console.log("프로필 이미지", image_url.length)
  const [image, setImage] = useState<string | ArrayBuffer | null>(image_url)
  const [preview, setPreview] = useState<string>("")
  const imageUploadRef = useRef<HTMLInputElement>(null)

  const { openModal } = useModal()

  const queryClient = useQueryClient()

  const handleSaveImage = async (image: File) => {
    const onSuccess = async () => {
      console.log("제출 전 사진", image)
      try {
        const imageUploadResponse = await uploadImages({
          category: "member",
          file: image,
        })
        console.log("upload", imageUploadResponse)

        await updateMemberInfo({
          id,
          image_url: imageUploadResponse.data.data?.image_url,
        }).then((res) => {
          console.log("res", res)
          if (res.data.code === 1242) {
            toast.success(res.data.msg, { position: "top-center" })
            queryClient.invalidateQueries({ queryKey: ["user"] })
          }
        })
      } catch (error) {
        toast.error(toastifyMessage.failToUploadImage)
        console.error("Error", error)
      }
    }

    const onCancel = async () => {
      toast.error(notificationMessage.cancleUploadImage, {
        position: "top-center",
      })
    }

    openModal({
      containsHeader: false,
      content: (
        <UploadProfileImageModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      ),
    })
    // const userResponse = window.confirm(confirmMessage.editProfileImage)
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

  return (
    <div>
      <div className="w-[150px] h-[150px] relative">
        {typeof image === "string" && <ImageArea image={image_url} />}
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

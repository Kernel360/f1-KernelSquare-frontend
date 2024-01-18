"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useEffect, useRef } from "react"
import type { ImageProps } from "../MyPage.type"
import Image from "next/image"
import { buttonMessage } from "@/constants/message"
import { Icons } from "@/components/icons/Icons"
import AuthGuardModal from "@/components/shared/auth-modal/AuthGuardModal"
import useProfileImage from "../hooks/useProfileImage"

function ProfileImage({ memberId, image_url }: ImageProps) {
  const imageUploadRef = useRef<HTMLInputElement>(null)
  const { user, image, preview, handleUpload, handleImageChange } =
    useProfileImage({
      image_url,
    })

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
        onChange={(e) => handleImageChange(e, memberId)}
      />
      <Button
        type="button"
        buttonTheme="primary"
        className="w-[150px] h-[30px]"
        onClick={() => handleUpload(imageUploadRef)}
      >
        {buttonMessage.updateProfile}
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

"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { buttonMessage } from "@/constants/message"
import Image from "next/image"
import useProfileImage from "../../hooks/useProfileImage"
import { useClientSession } from "@/hooks/useClientSession"
import { useRef } from "react"

interface ProfileImageProps {
  user_id: number
  image_url: string | null
}

const ProfileImage = ({ user_id, image_url }: ProfileImageProps) => {
  const { user } = useClientSession()
  const isMyPage = user?.member_id == user_id
  const { handleImageChange, handleUpload, handleResetImage } =
    useProfileImage(image_url)
  const imageUploadRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <ImageArea image_url={image_url} />
      <input
        type="file"
        ref={imageUploadRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageChange(e, user_id)}
      />
      {isMyPage && (
        <div>
          <Button
            type="button"
            buttonTheme="primary"
            className="max-w-[100px] min-w-[93px] h-[30px] mt-3 mb-1 block"
            onClick={() => handleUpload(imageUploadRef)}
          >
            {buttonMessage.updateProfile}
          </Button>
          <Button
            type="button"
            buttonTheme="primary"
            ghost
            className="max-w-[100px] h-[30px]"
            onClick={() => handleResetImage(user_id)}
          >
            {buttonMessage.resetProfile}
          </Button>
        </div>
      )}
    </>
  )
}

export default ProfileImage

interface ImageAreaProps {
  image_url: string | null
}

function ImageArea({ image_url }: ImageAreaProps) {
  // 이미지 없으면 기본
  if (!image_url)
    return (
      <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden [&_svg]:w-[120px] [&>svg]:h-[120px]">
        <Icons.UserProfile className="absolute text-colorsGray bg-white" />
      </div>
    )
  // 이미지 있을 경우
  return (
    <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden [&_svg]:w-[120px] [&>svg]:h-[120px]">
      <Image
        src={image_url}
        alt={`profile`}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  )
}

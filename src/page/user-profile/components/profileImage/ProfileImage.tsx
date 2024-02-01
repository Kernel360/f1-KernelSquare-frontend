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
  const isMyPage = user?.member_id === user_id
  const { handleImageChange, handleUpload } = useProfileImage({
    image_url: image_url!,
  })
  const imageUploadRef = useRef<HTMLInputElement>(null)

  if (!image_url) return <NoProfileImage />

  return (
    <>
      <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden [&_svg]:w-[120px] [&>svg]:h-[120px]">
        <Image
          src={image_url}
          alt={`profile`}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <input
        type="file"
        ref={imageUploadRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageChange(e, user_id)}
      />
      {isMyPage && (
        <Button
          type="button"
          buttonTheme="primary"
          className="max-w-[100px] h-[30px] my-3"
          onClick={() => handleUpload(imageUploadRef)}
        >
          {buttonMessage.updateProfile}
        </Button>
      )}
    </>
  )
}

export default ProfileImage

function NoProfileImage() {
  return (
    <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden [&_svg]:w-[120px] [&>svg]:h-[120px]">
      <Icons.UserProfile className="absolute text-colorsGray bg-white" />
    </div>
  )
}

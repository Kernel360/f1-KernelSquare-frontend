"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import Image from "next/image"
import useProfileImage from "../../hooks/useProfileImage"
import { useClientSession } from "@/hooks/useClientSession"
import { forwardRef, useRef } from "react"
import { baseImageLimitInstance } from "@/constants/image/image-limit"
import { ReturnSyncOrPromise } from "@/interfaces/callback"

interface ProfileImageProps {
  user_id: number
  image_url: string | null
}

const ProfileImage = ({ user_id, image_url }: ProfileImageProps) => {
  const { user } = useClientSession()
  const isMyPage = user?.member_id == user_id

  const { updateUserProfileImage, resetUserProfileImage, isPending } =
    useProfileImage()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectImageFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <ImageArea image_url={image_url} />
      {isMyPage && (
        <div>
          <FileInput
            ref={fileInputRef}
            onUploadImage={(file) => {
              updateUserProfileImage({ file })
            }}
          />
          <Button
            type="button"
            buttonTheme="primary"
            className="max-w-[100px] min-w-[93px] h-[30px] mt-3 mb-1 block"
            onClick={selectImageFile}
            disabled={isPending}
          >
            이미지 변경
          </Button>
          <Button
            type="button"
            buttonTheme="primary"
            ghost
            className="max-w-[100px] h-[30px] border border-transparent hover:border-primary"
            onClick={resetUserProfileImage}
            disabled={isPending}
          >
            이미지 초기화
          </Button>
        </div>
      )}
    </>
  )
}

export default ProfileImage

const FileInput = forwardRef<
  HTMLInputElement,
  { onUploadImage: (file: File) => ReturnSyncOrPromise }
>(function FileInputComponent({ onUploadImage }, ref) {
  return (
    <input
      type="file"
      ref={ref}
      hidden
      className="hidden"
      accept={baseImageLimitInstance.getImageAccept()}
      onInput={(e) => {
        const target = e.target as HTMLInputElement
        const files = target.files

        if (!files?.length) return

        onUploadImage(files[0])
      }}
    />
  )
})

function ImageArea({ image_url }: { image_url: string | null }) {
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

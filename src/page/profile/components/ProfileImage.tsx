"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Skeleton from "react-loading-skeleton"
import type { ImageProps } from "../MyPage.type"
import Image from "next/image"
import { updateMemberInfo } from "@/service/member"
import { useQueryClient } from "@tanstack/react-query"

function ProfileImage({ id, image_url }: ImageProps) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(image_url)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageUploadRef = useRef<HTMLInputElement>(null)

  const queryClient = useQueryClient()

  const handleSaveImage = (image: string) => {
    const userResponse = window.confirm("변경된 사진으로 저장하시겠습니까?")
    if (userResponse) {
      try {
        updateMemberInfo({
          id,
          image_url: image,
        }).then((res) => {
          console.log("res", res)
          if (res.data.code === 1242) {
            alert(res.data.msg)
            queryClient.invalidateQueries({ queryKey: ["user"] })
          }
        })
      } catch (error) {
        alert("사진 저장 중 오류가 발생했습니다. 다시 시도해주세요.")
        console.error("Error", error)
      }
    } else {
      alert("사진 저장이 취소되었습니다.")
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        setImage(reader.result || null)
        setImageLoaded(true)
        if (typeof image === "string") handleSaveImage(image)
      }
    }
  }

  const handleUpload = () => {
    const fileInput = imageUploadRef?.current
    if (fileInput) fileInput.click()
  }

  return (
    <div>
      <div className="w-[150px] h-[150px] relative">
        {typeof image === "string" && (
          <Image
            src={image}
            alt="프로필이미지"
            fill
            onLoad={() => setImageLoaded(true)}
            className="object-cover rounded-full"
          />
        )}
        {imageLoaded ? null : (
          <Skeleton
            circle
            width={150}
            height={150}
            className="absolute left-0 top-0"
          />
        )}
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

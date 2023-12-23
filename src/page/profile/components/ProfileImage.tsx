import { Icons } from "@/components/icons/Icons"
import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Skeleton from "react-loading-skeleton"
import type { ImageProps } from "../MyPage.type"
import Image from "next/image"

function ProfileImage({ image_url }: ImageProps) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(image_url)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageUploadRef = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Submitted Image URL:", image)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => {
        setImage(reader.result || null)
        setImageLoaded(true)
      }
    }
  }

  const handleUpload = () => {
    const fileInput = imageUploadRef?.current
    if (fileInput) fileInput.click()
  }

  if (!image_url)
    return (
      <Icons.UserProfile className="text-[30px] leading-8 fill-colorsGray shrink-0" />
    )

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
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
          type="submit"
          buttonTheme="primary"
          className="w-[150px] h-[30px]"
          onClick={handleUpload}
        >
          프로필 변경
        </Button>
      </form>
    </div>
  )
}

export default ProfileImage

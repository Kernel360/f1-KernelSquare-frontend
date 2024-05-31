import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import Image from "next/image"
import UploadedImageControl from "./UploadedImageControl"

export interface UploadedImageCallback {
  onDelete: () => void
  onAddLinkToContent: () => void
}

interface UploadedImageProps extends UploadedImageCallback {
  image: ImageFieldArrayItem
}

function UploadedImage({
  image,
  onDelete,
  onAddLinkToContent,
}: UploadedImageProps) {
  return (
    <div className="relative w-max flex justify-center overflow-hidden rounded-lg">
      <div className="cursor-pointer group relative w-20 aspect-square rounded-lg overflow-hidden">
        <Image
          src={image.uploadURL}
          alt="img"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <UploadedImageControl
        onDelete={onDelete}
        onAddLinkToContent={onAddLinkToContent}
      />
    </div>
  )
}

export default UploadedImage

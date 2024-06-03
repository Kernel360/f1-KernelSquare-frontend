import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import { Editor } from "@toast-ui/react-editor"
import { useId } from "react"

export interface RenderUploadedImageProps {
  image: ImageFieldArrayItem
  imageIndex: number
  isInitialImage: boolean
  editor?: Editor
}

interface UploadedImagesProps {
  images: ImageFieldArrayItem[]
  initialImages: ImageFieldArrayItem[]
  editor?: Editor
  renderImage: (props: RenderUploadedImageProps) => React.ReactNode
}

function UploadedImages({
  images,
  initialImages,
  renderImage,
  editor,
}: UploadedImagesProps) {
  const id = useId()

  if (!images.length) return <>업로드 된 이미지가 없습니다</>

  return (
    <ul className="flex flex-wrap gap-2 items-center">
      {images.map((image, index) => {
        const isInitialImage =
          !!initialImages.length &&
          !!initialImages.find(
            (initialImage) => initialImage.uploadURL === image.uploadURL,
          )

        return (
          <li key={`${id}${image.uploadURL}`}>
            {renderImage({ image, imageIndex: index, editor, isInitialImage })}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadedImages

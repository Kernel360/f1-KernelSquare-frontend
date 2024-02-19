"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import Image from "next/image"
import type { EditMode } from "./components/AskQuestionPageControl"

interface CancelUploadImageModalProps {
  imageUrl: string
  initialUploadImages?: Array<string>
  editMode: EditMode
  onAgree: () => void | Promise<void>
  onCancel: () => void | Promise<void>
}

function CancelUploadImageModal({
  imageUrl,
  initialUploadImages,
  editMode,
  onAgree,
  onCancel,
}: CancelUploadImageModalProps) {
  const isSoftDelteTargetImage = initialUploadImages?.includes(imageUrl)

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">업로드된 이미지 파일을 삭제하시겠습니까?</p>
      <Spacing size={12} />
      <p className="text-center text-sm text-orange-500">
        {isSoftDelteTargetImage
          ? "작성 성공시 이미지가 삭제되며, 이후 해당 이미지 주소를 사용할 수 없습니다"
          : "삭제 이후, 해당 이미지 주소를 사용할 수 없습니다"}
      </p>
      <Spacing size={12} />
      <div className="relative w-20 aspect-square rounded-lg overflow-hidden mx-auto">
        <Image
          src={imageUrl}
          alt={"삭제 요청 이미지"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center gap-2">
        <Button buttonTheme="primary" onClick={onAgree}>
          이미지 삭제
        </Button>
        <Button buttonTheme="secondary" onClick={onCancel}>
          취소
        </Button>
      </div>
    </div>
  )
}

export default CancelUploadImageModal

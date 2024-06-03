"use client"

import { useImagePending } from "@/hooks/image/useImagePending"

function ImageIndicator() {
  const { uploadImagePending, deleteImagePending } = useImagePending()

  return (
    <>
      {uploadImagePending ? <UploadImageIndicator /> : null}
      {deleteImagePending ? <DeleteImageIndicator /> : null}
    </>
  )
}

export default ImageIndicator

const IndicatorWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center bg-white/50 z-[31]">
      {children}
    </div>
  )
}

const UploadImageIndicator = () => {
  return <IndicatorWrapper>이미지 업로드 중...</IndicatorWrapper>
}

const DeleteImageIndicator = () => {
  return <IndicatorWrapper>이미지 삭제 중...</IndicatorWrapper>
}

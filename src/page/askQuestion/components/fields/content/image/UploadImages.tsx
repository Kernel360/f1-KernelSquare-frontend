"use client"

import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import Image from "next/image"
import { useId } from "react"
import { QUESTION_LIMITS } from "@/constants/limitation"
import UploadImageControl from "./UploadImageControl"

function UploadImages() {
  const { imageFieldArray } = useQuestionFormContext()
  const idSeperator = useId()

  if (!imageFieldArray.fields.length) {
    return <UploadImageSection>업로드된 이미지가 없습니다.</UploadImageSection>
  }

  return (
    <UploadImageSection>
      <ul className="flex flex-wrap gap-2 items-center">
        {imageFieldArray.fields.map(({ file, uploadURL }, index) => {
          return (
            <li key={`${idSeperator}${uploadURL}`}>
              <UploadImage image={{ file, uploadURL }} imageIndex={index} />
            </li>
          )
        })}
      </ul>
    </UploadImageSection>
  )
}

export default UploadImages

const UploadImage = ({
  image,
  imageIndex,
}: {
  image: ImageFieldArrayItem
  imageIndex: number
}) => {
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
      <UploadImageControl image={image} imageIndex={imageIndex} />
    </div>
  )
}

const UploadImageSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="flex w-full items-center gap-x-1">
        <div className="text-xs text-colorsDarkGray font-medium">
          업로드된 이미지
        </div>
        <UploadImageCount />
      </div>
      <div className="p-1 bg-info">{children}</div>
    </section>
  )
}

const UploadImageCount = () => {
  const { imageFieldArray } = useQuestionFormContext()

  return (
    <div className="inline-flex align-top items-center text-xs font-medium">
      <span>&#40;&nbsp;</span>
      <span
        className={`${
          imageFieldArray.fields.length > QUESTION_LIMITS.image.maxLength
            ? "text-danger"
            : "text-primary"
        }`}
      >
        {imageFieldArray.fields.length}
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span>{QUESTION_LIMITS.image.maxLength}</span>
      <span>&nbsp;&#41;&nbsp;</span>
    </div>
  )
}

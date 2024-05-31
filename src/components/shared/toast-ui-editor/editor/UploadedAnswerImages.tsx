"use client"

import { QUESTION_ANSWER_LIMITS } from "@/constants/limitation"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import UploadedImageSection from "./image/ui/UploadedImageSection"
import UploadedImages from "./image/ui/UploadedImages"
import UploadedAnswerImage from "./image/UploadedAnswerImage"

function UploadedAnswerImages() {
  const { imageFieldArray, editorRef, defaultValues } = useAnswerFormContext()

  return (
    <UploadedImageSection counter={<UploadedImageCount />}>
      <UploadedImages
        images={imageFieldArray.fields}
        initialImages={defaultValues.images}
        editor={editorRef.current ?? undefined}
        renderImage={(props) => <UploadedAnswerImage {...props} />}
      />
    </UploadedImageSection>
  )
}

export default UploadedAnswerImages

const UploadedImageCount = () => {
  const { imageFieldArray } = useAnswerFormContext()

  return (
    <div className="inline-flex align-top items-center text-xs font-medium">
      <span>&#40;&nbsp;</span>
      <span
        className={`${
          imageFieldArray.fields.length > QUESTION_ANSWER_LIMITS.image.maxLength
            ? "text-danger"
            : "text-primary"
        }`}
      >
        {imageFieldArray.fields.length}
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span>{QUESTION_ANSWER_LIMITS.image.maxLength}</span>
      <span>&nbsp;&#41;&nbsp;</span>
    </div>
  )
}

"use client"

import TextCounter from "@/components/shared/TextCounter"
import { CODING_MEETING_LIMITS } from "@/constants/limitation"
import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import { codingMeetingContentRules } from "./rules/content/coding-meeting-content-rules"
import AutoResizeTextArea from "@/components/shared/textarea/AutoResizeTextArea"

interface ContentControllerProps {
  initialContent?: CodingMeetingFormData["content"]
}

function ContentController({ initialContent }: ContentControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "content",
    rules: codingMeetingContentRules,
    defaultValue: initialContent ?? "",
  })

  const placeholder = `모집글의 내용을 작성해주세요\n(최대 ${Intl.NumberFormat(
    "ko-KR",
  ).format(CODING_MEETING_LIMITS.content.maxLength)}자)`

  return (
    <div className="w-full">
      <AutoResizeTextArea
        ref={field.ref}
        id="meeting-content"
        className="px-2 py-1 outline-none border border-colorsGray rounded-lg"
        value={field.value}
        placeholder={placeholder}
        fullWidth
        minRows={2}
        onChange={field.onChange}
      />
      <div className="h-5 text-end">
        <TextCounter
          target={!!field.value}
          text={field.value}
          min={CODING_MEETING_LIMITS.content.minLength}
          max={CODING_MEETING_LIMITS.content.maxLength}
        />
      </div>
    </div>
  )
}

export default ContentController

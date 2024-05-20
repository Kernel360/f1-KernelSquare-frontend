"use client"

import TextCounter from "@/components/shared/TextCounter"
import Textarea from "@/components/shared/textarea/Textarea"
import { CODING_MEETING_LIMITS } from "@/constants/limitation"
import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import { codingMeetingContentRules } from "./rules/content/coding-meeting-content-rules"

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

  return (
    <div className="w-full">
      <Textarea
        ref={field.ref}
        id="meeting-content"
        className="resize-none w-full h-[200px]"
        placeholder="모집글의 내용을 작성해주세요 (최대 10,000자)"
        onChange={field.onChange}
        value={field.value}
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

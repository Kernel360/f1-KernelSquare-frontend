import { CODING_MEETING_LIMITS } from "@/constants/limitation"
import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type CodingMeetingContentRules = Omit<
  RegisterOptions<CodingMeetingFormData, "content">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const codingMeetingContentRules: CodingMeetingContentRules = {
  required: "모집글의 내용을 작성해주세요",
  minLength: {
    value: CODING_MEETING_LIMITS.content.minLength,
    message: `모집글은 최소 ${CODING_MEETING_LIMITS.content.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: CODING_MEETING_LIMITS.content.maxLength,
    message: `모집글은 최대 ${CODING_MEETING_LIMITS.content.maxLength}자 이하이어야 합니다`,
  },
}

import { CODING_MEETING_LIMITS } from "@/constants/limitation"
import { validationMessage } from "@/constants/message/validation"
import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type CodingMeetingTitleRules = Omit<
  RegisterOptions<CodingMeetingFormData, "title">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const codingMeetingTitleRules: CodingMeetingTitleRules = {
  required: validationMessage.notitle,
  minLength: {
    value: CODING_MEETING_LIMITS.title.minLength,
    message: `제목은 ${CODING_MEETING_LIMITS.title.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: CODING_MEETING_LIMITS.title.maxLength,
    message: `제목은 ${CODING_MEETING_LIMITS.title.maxLength}자 이하여야 합니다`,
  },
}

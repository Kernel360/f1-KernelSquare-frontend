import { CODING_MEETING_LIMITS } from "@/constants/limitation"
import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type MemberCountRules = Omit<
  RegisterOptions<CodingMeetingFormData, "member_upper_limit">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const memberCountRules: MemberCountRules = {
  required: "모임 인원을 설정해 주세요",
  min: {
    value: CODING_MEETING_LIMITS.memberCount.min,
    message: "모임 인원은 본인 포함 최소 3명부터 가능합니다",
  },
  max: {
    value: CODING_MEETING_LIMITS.memberCount.max,
    message: "모임 인원은 본인 포함 최대 6명까지 가능합니다",
  },
}

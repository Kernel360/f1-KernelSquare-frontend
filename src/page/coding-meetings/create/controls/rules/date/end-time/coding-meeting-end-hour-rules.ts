import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type CodingMeetingEndHourRules = Omit<
  RegisterOptions<CodingMeetingFormData, "date.end_time.0">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const codingMeetingEndHourRules: CodingMeetingEndHourRules = {
  required: "모임 종료시간의 시(hour)를 선택해주세요",
  validate: (endHour, values) => {
    if (!values.date.start_time) return true

    const [startHour, _] = values.date.start_time

    if (!startHour) return true

    if (Number(endHour) < Number(startHour)) {
      return "모임 종료 시간은 시작 시간 이후여야 합니다"
    }

    return true
  },
}

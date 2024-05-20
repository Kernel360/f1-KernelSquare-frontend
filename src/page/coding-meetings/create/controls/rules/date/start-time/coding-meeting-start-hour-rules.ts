import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type CodingMeetingStartHourRules = Omit<
  RegisterOptions<CodingMeetingFormData, "date.start_time.0">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const codingMeetingStartHourRules: CodingMeetingStartHourRules = {
  required: "모임 시작시간의 시(hour)를 선택해주세요",
  validate: (startHour, values) => {
    if (!values.date.end_time) return true

    const [endHour, _] = values.date.end_time

    if (!endHour) return true

    if (Number(startHour) > Number(endHour)) {
      return "모임 시작 시간은 종료 시간 이전이어야 합니다"
    }

    return true
  },
}

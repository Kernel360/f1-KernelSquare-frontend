import { CodingMeetingFormData } from "@/interfaces/form"
import dayjs from "dayjs"
import { RegisterOptions } from "react-hook-form"

type CodingMeetingDayRules = Omit<
  RegisterOptions<CodingMeetingFormData, "date.day">,
  "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
>

export const codingMeetingDayRules: CodingMeetingDayRules = {
  validate: (day) => {
    const meetingDay = dayjs(day).startOf("days")
    const now = dayjs().startOf("days")

    if (meetingDay.isBefore(now)) {
      return `모임 날짜는 ${now.format("YYYY-MM-DD")} 부터 가능합니다`
    }

    return true
  },
}

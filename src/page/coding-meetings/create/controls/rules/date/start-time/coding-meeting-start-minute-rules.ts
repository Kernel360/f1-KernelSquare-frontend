import { CodingMeetingFormData } from "@/interfaces/form"
import { RegisterOptions } from "react-hook-form"

type CodingMeetingStartMinuteRules = Omit<
  RegisterOptions<CodingMeetingFormData, "date.start_time.1">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export const codingMeetingStartMinuteRules: CodingMeetingStartMinuteRules = {
  required: "모임 시작시간의 분(minute)을 선택해주세요",
  validate: (startMinute, values) => {
    if (!values.date.day || !values.date.start_time || !values.date.end_time)
      return true

    const [startHour, _] = values.date.start_time
    const [endHour, endMinute] = values.date.end_time

    if (!endHour || !endMinute || !startHour) return true

    const [startTimeNumberFormat, endTimeNumberFormat] = [
      Number(`${startHour}${startMinute}`),
      Number(`${endHour}${endMinute}`),
    ]

    if (startTimeNumberFormat > endTimeNumberFormat) {
      /*
        11:30 => Number('1130') => 1130
        00:30 => Number('0030') => 30
        - 시작시간, 종료시간 문자 포멧을 숫자로 변환하여 
          대소를 비교해도 된다고 판단
          (일은 동일하기 때문에 dayjs 연산이 필요하지 않다고 판단)
      */

      return "모임 시작 시간은 종료 시간 이전이어야 합니다"
    }

    if (startTimeNumberFormat === endTimeNumberFormat) {
      return "모임 시작 시간과 종료 시간은 서로 다르게 설정해야 합니다"
    }

    return true
  },
}

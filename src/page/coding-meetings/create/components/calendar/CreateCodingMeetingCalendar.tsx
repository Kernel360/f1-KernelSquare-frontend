"use client"

import "@/styles/react-calendar/CodingMeetingTile.css"
import { CodingMeetingFormData } from "@/interfaces/form"
import ReservationCalendarBase from "@/page/coffee-chat/detail/reservation/calendar-base/ReservationCalendarBase"
import dayjs from "dayjs"
import { useController, useFormContext } from "react-hook-form"
import { codingMeetingDayRules } from "../../controls/rules/date/day/coding-meeting-day-rules"

interface CreateCodingMeetingCalendarProps {
  initialDay?: CodingMeetingFormData["date"]["day"]
}

const CreateCodingMeetingCalendar = ({
  initialDay,
}: CreateCodingMeetingCalendarProps) => {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "date.day",
    rules: codingMeetingDayRules,
    defaultValue: initialDay
      ? dayjs(initialDay).startOf("days").toDate()
      : dayjs().startOf("days").toDate(),
  })

  return (
    <ReservationCalendarBase
      ref={field.ref}
      minDate={
        initialDay
          ? dayjs(initialDay).startOf("days").toDate()
          : dayjs().startOf("days").toDate()
      }
      date={field.value}
      onDateChange={(date) =>
        field.onChange(
          dayjs(date as any)
            .startOf("days")
            .toDate(),
        )
      }
      tileClassName={({ date }) => {
        if (initialDay) {
          return dayjs(date)
            .startOf("days")
            .isSame(dayjs(initialDay).startOf("days"))
            ? "prev_meeting_day"
            : ""
        }

        return ""
      }}
      tileDisabled={({ date }) => {
        return dayjs(date).isBefore(dayjs().startOf("days"))
      }}
    />
  )
}
export default CreateCodingMeetingCalendar

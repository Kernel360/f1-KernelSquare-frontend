"use client"

import { useRecoilState } from "recoil"
import ReservationCalendarBase from "../calendar-base/ReservationCalendarBase"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { CalendarProps } from "react-calendar"
import dayjs from "dayjs"
import { useLayoutEffect } from "react"

interface ReservationCalendarProps {
  startTime: string
}

function ReservationCalendar({ startTime }: ReservationCalendarProps) {
  const [selectedDate, setSelectedDate] = useRecoilState(
    ReservationSelectedDateAtom,
  )

  const onDateChange: NonNullable<CalendarProps["onChange"]> = (
    value,
    event,
  ) => {
    setSelectedDate(value)
  }

  useLayoutEffect(() => {
    return () => {
      setSelectedDate(null)
    }
  }, []) /* eslint-disable-line */

  return (
    <ReservationCalendarBase
      start={dayjs(startTime).toDate()}
      limit={2}
      date={selectedDate ?? dayjs(startTime).toDate()}
      onDateChange={onDateChange}
    />
  )
}

export default ReservationCalendar

"use client"

import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { getChatPeriods } from "@/util/chat/time"
import dayjs from "dayjs"
import { useLayoutEffect } from "react"
import { CalendarProps, TileArgs } from "react-calendar"
import { useRecoilState } from "recoil"
import ReservationCalendarBase from "../../detail/reservation/calendar-base/ReservationCalendarBase"
import { useSelectedChatTimes } from "../hooks/useSelectedChatTimes"

function ChatScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useRecoilState(
    ReservationSelectedDateAtom,
  )

  const { addPeriodToMap } = useSelectedChatTimes()

  const startDate = dayjs().add(7, "days").startOf("days").toDate()

  const periods = selectedDate
    ? getChatPeriods({
        startTime: dayjs(selectedDate as Date).format(),
      })
    : null

  const onDateChange: NonNullable<CalendarProps["onChange"]> = (
    value,
    event,
  ) => {
    if (selectedDate && dayjs(value as Date).isSame(selectedDate as Date)) {
      return
    }

    setSelectedDate(value)
    addPeriodToMap(value as Date)
  }

  const tileClassname = ({ date }: TileArgs) => {
    const prefix = "action--create"

    if (!selectedDate) return undefined

    const {
      reservationPossible: [reservationPossibleStart, reservationPossibleEnd],
      reservationConfirm,
      chat: [chatStart, chatEnd],
    } = periods!

    if (
      dayjs(date).isBetween(
        reservationPossibleStart,
        reservationPossibleEnd,
        "minutes",
        "[]",
      )
    ) {
      return `${prefix} reservation-possible`
    }
    if (dayjs(date).isSame(reservationConfirm)) {
      return `${prefix} reservation-confirm`
    }
    if (dayjs(date).isBetween(chatStart, chatEnd, "minutes", "[]")) {
      return `${prefix} mentoring`
    }

    return undefined
  }

  useLayoutEffect(() => {
    return () => {
      setSelectedDate(null)
    }
  }, []) /* eslint-disable-line */

  return (
    <ReservationCalendarBase
      start={startDate}
      limit={21}
      date={selectedDate}
      onDateChange={onDateChange}
      tileClassName={tileClassname}
      minDate={startDate}
    />
  )
}

export default ChatScheduleCalendar

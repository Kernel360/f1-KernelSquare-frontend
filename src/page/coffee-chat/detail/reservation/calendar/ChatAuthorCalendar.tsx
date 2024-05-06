"use client"

import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { useLayoutEffect } from "react"
import { CalendarProps, TileArgs } from "react-calendar"
import { useRecoilState } from "recoil"
import ReservationCalendarBase from "../calendar-base/ReservationCalendarBase"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

interface ChatAuthorCalendarProps {
  startTime: string
}

function ChatAuthorCalendar({ startTime }: ChatAuthorCalendarProps) {
  const [selectedDate, setSelectedDate] = useRecoilState(
    ReservationSelectedDateAtom,
  )

  const {
    reservationPossible: [reservationPossibleStart, reservationPossibleEnd],
    reservationConfirm,
    chat: [chatStart, chatEnd],
  } = periods({
    startTime,
  })

  const onDateChange: NonNullable<CalendarProps["onChange"]> = (
    value,
    event,
  ) => {
    if (!dayjs(value as Date).isBetween(chatStart, chatEnd, "minutes", "[]")) {
      return
    }

    setSelectedDate(value)
  }

  const tileClassname = ({ date }: TileArgs) => {
    if (
      dayjs(date).isBetween(
        reservationPossibleStart,
        reservationPossibleEnd,
        "minutes",
        "[]",
      )
    ) {
      return "reservation-possible"
    }
    if (dayjs(date).isSame(reservationConfirm)) {
      return "reservation-confirm"
    }
    if (dayjs(date).isBetween(chatStart, chatEnd, "minutes", "[]")) {
      return "mentoring"
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
      start={dayjs(startTime).toDate()}
      limit={2}
      date={selectedDate ?? dayjs(startTime).toDate()}
      onDateChange={onDateChange}
      tileClassName={tileClassname}
      minDate={reservationPossibleStart.toDate()}
    />
  )
}

export default ChatAuthorCalendar

const periods = ({ startTime }: { startTime: string }) => {
  const startDate = dayjs(startTime).startOf("days")

  return {
    reservationPossible: [
      dayjs(startDate).subtract(6, "days"),
      dayjs(startDate).subtract(2, "days"),
    ],
    reservationConfirm: dayjs(startDate).subtract(1, "days"),
    chat: [startDate, dayjs(startDate).add(2, "days")],
  }
}

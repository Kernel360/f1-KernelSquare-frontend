"use client"

import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { useLayoutEffect } from "react"
import { CalendarProps, TileArgs } from "react-calendar"
import { useRecoilState } from "recoil"
import ReservationCalendarBase from "../calendar-base/ReservationCalendarBase"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { getChatPeriods } from "@/util/chat/time"

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
  } = getChatPeriods({
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

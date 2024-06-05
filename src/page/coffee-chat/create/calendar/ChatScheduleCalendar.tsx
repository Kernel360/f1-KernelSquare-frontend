"use client"

import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { getChatPeriods } from "@/util/chat/time"
import dayjs from "dayjs"
import { CalendarProps, TileArgs } from "react-calendar"
import { useRecoilState } from "recoil"
import ReservationCalendarBase from "../../detail/reservation/calendar-base/ReservationCalendarBase"
import { useSelectedChatTimes } from "../hooks/useSelectedChatTimes"

interface ChatScheduleCanlendarProps {
  initialStartDate?: Date
}

function ChatScheduleCalendar({
  initialStartDate,
}: ChatScheduleCanlendarProps) {
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

  return (
    <ReservationCalendarBase
      start={startDate}
      limit={21}
      minDate={
        initialStartDate
          ? dayjs(initialStartDate).startOf("days").toDate()
          : startDate
      }
      date={selectedDate}
      onDateChange={onDateChange}
      tileClassName={tileClassname}
      tileDisabled={({ date }) => {
        return dayjs(date).isBefore(dayjs().add(7, "days").startOf("days"))
      }}
    />
  )
}

export default ChatScheduleCalendar

"use client"

import Calendar, { CalendarProps, TileArgs } from "react-calendar"
import "./Calendar.css"
import { getDay, getHoliday } from "@/util/getDate"
import dayjs from "dayjs"
import { Value } from "./Calendar.types"
import ReactCalendarTileContent from "@/components/react-calendar/ReactCalendarTileContent"
import { ForwardedRef, forwardRef } from "react"
import { twMerge } from "tailwind-merge"

type ReservationCalendarBaseProps = {
  start?: Date
  limit?: number
  date: Value
  onDateChange?: CalendarProps["onChange"]
  tileClassName?: CalendarProps["tileClassName"]
  minDate?: Date
  maxDate?: Date
  tileDisabled?: CalendarProps["tileDisabled"]
  wrapperClassName?: string
}

const ReservationCalendarBase = (
  {
    start,
    limit,
    date,
    onDateChange,
    tileClassName,
    tileDisabled,
    minDate,
    maxDate,
    wrapperClassName,
  }: ReservationCalendarBaseProps,
  ref: ForwardedRef<any>,
) => {
  // 종료 날짜
  const calendarValue = limit
    ? new Date(dayjs(start).add(limit, "day").format())
    : undefined

  const tileClassNames = ({ date, activeStartDate, view }: TileArgs) => {
    const holiday = getHoliday(date)

    if (tileClassName) {
      if (typeof tileClassName === "function") {
        return (
          tileClassName({ date, activeStartDate, view }) +
          " " +
          (holiday ? "holiday" : "")
        )
      }

      if (Array.isArray(tileClassName)) {
        const className = holiday
          ? [...tileClassName, "holiday"]
          : [...tileClassName]

        return className.join(" ")
      }

      return holiday ? `${tileClassName} holiday` : tileClassName
    }

    return holiday ? "holiday" : undefined
  }

  const wrapperClassNames = twMerge([
    "focus:outline focus:outline-1 focus:outline-blue-400/40",
    wrapperClassName,
    "react-calendar",
  ])

  return (
    <div className={wrapperClassNames} ref={ref} tabIndex={0}>
      <Calendar
        locale="ko"
        onChange={onDateChange}
        value={date}
        // 숫자만 보이게 설정
        formatDay={(_, date) => getDay(date)}
        navigationLabel={undefined}
        minDetail="month"
        maxDetail="month"
        className={"mx-auto text-sm border-white"}
        allowPartialRange
        next2Label={null}
        prev2Label={null}
        minDate={minDate ?? start}
        maxDate={maxDate ?? calendarValue}
        // 날짜 타일에 추가할 컨텐츠
        tileContent={ReactCalendarTileContent}
        tileClassName={tileClassNames}
        tileDisabled={tileDisabled}
      />
    </div>
  )
}

export default forwardRef<any, ReservationCalendarBaseProps>(
  ReservationCalendarBase,
)

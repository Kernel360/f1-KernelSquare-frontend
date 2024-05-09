"use client"

import Calendar, { CalendarProps, TileArgs } from "react-calendar"
import "./Calendar.css"
import { getDay, getHoliday } from "@/util/getDate"
import dayjs from "dayjs"
import { Value } from "./Calendar.types"
import ReactCalendarTileContent from "@/components/react-calendar/ReactCalendarTileContent"

type ReservationCalendarBaseProps = {
  start: Date
  limit: number
  date: Value
  onDateChange?: CalendarProps["onChange"]
  tileClassName?: CalendarProps["tileClassName"]
  minDate?: Date
  maxDate?: Date
}

const ReservationCalendarBase = ({
  start,
  limit,
  date,
  onDateChange,
  tileClassName,
  minDate,
  maxDate,
}: ReservationCalendarBaseProps) => {
  // 종료 날짜
  const calendarValue = new Date(dayjs(start).add(limit, "day").format())

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

  return (
    <div className="react-calendar">
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
      />
    </div>
  )
}

export default ReservationCalendarBase

"use client"

import Calendar, { TileArgs } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "./Calendar.css"
import { type Dispatch, type SetStateAction } from "react"
import { getDay } from "@/util/getDate"
import dayjs from "dayjs"
import Holidays from "@/constants/holidays"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

type CustomCalendarProps = {
  start: string
  date: Value
  setDate: Dispatch<SetStateAction<Value>>
}

const CustomCalendar = ({ start, date, setDate }: CustomCalendarProps) => {
  // 시작 날짜
  const startDate = new Date(start)
  // 종료 날짜
  const calendarValue = new Date(dayjs(startDate).add(2, "day").format())
  // 공휴일 포함 여부
  const isHoliday = (date: Date) =>
    Holidays.some((day) => day.date === dayjs(date).format("YYYY-MM-DD"))
  const getHoliday = (date: Date) =>
    Holidays.find((day) => day.date === dayjs(date).format("YYYY-MM-DD"))
  // 공휴일 이름 formatting
  const formatName = (name: string) => name.replaceAll(" ", "\n")

  // 타일에 특정 정보 표시
  const showSpecificDays = ({ date }: TileArgs) => {
    const today = new Date()
    if (date === today) {
      return <div>Today</div>
    }
    if (isHoliday(date)) {
      const name = getHoliday(date)?.name
      if (name)
        return (
          <div className="text-[10px] whitespace-pre ">{formatName(name)}</div>
        )
    }
  }

  return (
    <div className="react-calendar">
      <Calendar
        locale="ko"
        onChange={setDate}
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
        minDate={startDate}
        maxDate={calendarValue}
        // 날짜 타일에 추가할 컨텐츠
        tileContent={showSpecificDays}
      />
    </div>
  )
}

export default CustomCalendar

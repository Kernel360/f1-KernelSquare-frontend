"use client"

import Calendar, { TileArgs } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "./Calendar.css"
import { type Dispatch, type SetStateAction, useState } from "react"
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

  // 타일에 특정 정보 표시
  const showSpecificDays = ({ date }: TileArgs) => {
    const today = new Date()
    if (date === today) {
      return <div>Today</div>
    }
    if (Holidays.includes(dayjs(date).format("YYYY-MM-DD"))) {
      return <div className="text-[10px]">공휴일</div>
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

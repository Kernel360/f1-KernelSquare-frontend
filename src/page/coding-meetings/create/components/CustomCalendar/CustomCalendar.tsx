"use client"

import Calendar, { TileArgs } from "react-calendar"
import "./Calendar.css"
import { getDay } from "@/util/getDate"
import dayjs from "dayjs"
import Holidays from "@/constants/holidays"
import { Dispatch, SetStateAction } from "react"
import { Value } from "@/interfaces/calendar"

type CustomCalendarProps = {
  date: Value
  setDate: Dispatch<SetStateAction<Value>>
}

const CustomCalendar = ({ date, setDate }: CustomCalendarProps) => {
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
    <div className="react-calendar min-h-[450px]">
      <Calendar
        locale="ko"
        onChange={setDate}
        value={date}
        // 숫자만 보이게 설정
        formatDay={(_, date) => getDay(date)}
        navigationLabel={undefined}
        minDetail="month"
        maxDetail="month"
        className={"mx-auto text-sm border-white w-full"}
        allowPartialRange
        next2Label={null}
        prev2Label={null}
        minDate={new Date()}
        // 날짜 타일에 추가할 컨텐츠
        tileContent={showSpecificDays}
      />
    </div>
  )
}

export default CustomCalendar

"use client"

import Calendar, { TileArgs } from "react-calendar"
import "./Calendar.css"
import { getDate, getDay } from "@/util/getDate"
import dayjs from "dayjs"
import Holidays from "@/constants/holidays"
import { useRecoilState } from "recoil"
import {
  CoffeeChatStartDate,
  SelectedDate,
} from "@/recoil/atoms/coffee-chat/schedule"
import { Value } from "./Calendar.types"
import { useSetScheduleList } from "../../hooks/useGetScheduleList"

type CustomCalendarProps = {
  start: Date
  limit: number
}

const CustomCalendar = ({ start, limit }: CustomCalendarProps) => {
  const [date, setDate] = useRecoilState(CoffeeChatStartDate)
  const [selectedDate, setSelectedDate] = useRecoilState(SelectedDate)
  // 종료 날짜
  const calendarValue = new Date(dayjs(start).add(limit, "day").format())
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

  // 예약 가능 기간
  const isReservationPossiblePeriod = (target: Date) => {
    const date1 = dayjs(date + "", "YYYY-MM-DD")
    const date2 = dayjs(target, "YYYY-MM-DD")
    if (date2.diff(date1, "day") >= -6 && date2.diff(date1, "day") <= -2)
      return true
    return false
  }

  // 예약 확정 기간
  const isReservationConfirmPeriod = (target: Date) => {
    const date1 = dayjs(date + "", "YYYY-MM-DD")
    const date2 = dayjs(target, "YYYY-MM-DD")
    if (date2.diff(date1, "day") === -1) return true
    return false
  }

  // 커피챗 기간
  const isMentoringPeriod = (target: Date) => {
    const date1 = dayjs(date + "", "YYYY-MM-DD")
    const date2 = dayjs(target, "YYYY-MM-DD")
    if (getDate({ date: start + "" }) === getDate({ date: date + "" })) {
      if (
        Math.round(date2.diff(date1, "day", true)) >= 0 &&
        date2.diff(date1, "day") <= 1
      )
        return true
      return false
    } else if (date2.diff(date1, "day") >= 0 && date2.diff(date1, "day") <= 2) {
      return true
    } else return false
  }

  const dateRangeClassName = ({ date }: TileArgs) => {
    if (isReservationPossiblePeriod(date)) return "reservation-possible"
    if (isReservationConfirmPeriod(date)) return "reservation-confirm"
    if (isMentoringPeriod(date)) return "mentoring"
  }

  // onChange 함수
  const setFirstDate = useSetScheduleList(0)
  const setSecondDate = useSetScheduleList(1)
  const setThirdDate = useSetScheduleList(2)
  const handleDateChange = (value: Value) => {
    setFirstDate({
      schedule: [],
    })
    setSecondDate({
      schedule: [],
    })
    setThirdDate({
      schedule: [],
    })
    setDate(value)
    setSelectedDate(dayjs(value + "").format("YYYY년MM월DD일"))
  }

  return (
    <div className="react-calendar">
      <Calendar
        locale="ko"
        onChange={(val) => handleDateChange(val)}
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
        minDate={start}
        maxDate={calendarValue}
        // 날짜 타일에 추가할 컨텐츠
        tileContent={showSpecificDays}
        tileClassName={dateRangeClassName}
      />
    </div>
  )
}

export default CustomCalendar

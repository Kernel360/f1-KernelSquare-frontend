"use client"

import dayjs from "dayjs"
import CustomCalendar from "../../detail/reservation/CustomCalendar/CustomCalendar"
import CoffeeChatSection from "./CoffeeChatSection"
import { getDate } from "@/util/getDate"
import { DirectionIcons } from "@/components/icons/Icons"
import TimeOptions from "./TimeOptions"
import { AM, PM } from "@/constants/timeOptions"
import { useState } from "react"
import type { Value } from "../../detail/reservation/CustomCalendar/Calendar.types"
import { TimeZone } from "../CreateCoffeeChatReservationPage.types"
import { twJoin } from "tailwind-merge"
import { useRecoilState } from "recoil"
import { ScheduleList } from "@/recoil/atoms/coffee-chat/schedule"

const ScheduleSection = () => {
  // 캘린더에서 선택된 날짜
  const [date, setDate] = useState<Value>(new Date())
  // 오전 or 오후
  const [timeZone, setTimeZone] = useState<TimeZone>(TimeZone.AM)
  // 선택된 시간대
  const [schedule, setSchedule] = useRecoilState(ScheduleList)

  // 오전, 오후 선택 화살표 스타일
  const ArrowClassName = (disabled: boolean) =>
    twJoin([disabled && "text-slate-200"], [!disabled && "cursor-pointer"])

  return (
    <CoffeeChatSection>
      <div className="w-full align-top max-w-full flex-col md:flex-row md:justify-start md:items-center">
        <CoffeeChatSection.Label className="block w-max">
          멘토링 가능 일시
        </CoffeeChatSection.Label>
        <div className="flex justify-around">
          <CustomCalendar
            start={dayjs().format()}
            date={date}
            limit={29}
            setDate={setDate}
          />
          <div>
            <div className="mb-5 text-xl text-secondary font-bold text-center">
              {getDate({ date: date + "" })}
            </div>
            <div className="flex">
              <DirectionIcons.Left
                className={ArrowClassName(timeZone === TimeZone.AM)}
                onClick={() => setTimeZone(TimeZone.AM)}
              />
              {timeZone === "AM" && (
                <div className="text-center">
                  <div className="font-bold text-primary text-lg mb-5">
                    오전
                  </div>
                  <TimeOptions date={AM} />
                </div>
              )}
              {timeZone === "PM" && (
                <div className="text-center">
                  <div className="font-bold text-primary text-lg mb-5">
                    오후
                  </div>
                  <TimeOptions date={PM} />
                </div>
              )}
              <DirectionIcons.Right
                className={ArrowClassName(timeZone === TimeZone.PM)}
                onClick={() => setTimeZone(TimeZone.PM)}
              />
            </div>
          </div>
        </div>
      </div>
    </CoffeeChatSection>
  )
}

export default ScheduleSection

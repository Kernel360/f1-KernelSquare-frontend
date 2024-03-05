"use client"

import { getDate } from "@/util/getDate"
import { useProgressModal } from "@/hooks/useProgressModal"
import { useParams } from "next/navigation"
import { MockReservations } from "@/mocks/db/coffee-chat"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useEffect, useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"
import {
  CoffeeChatReservationDetailPayload,
  CoffeeChatReservationTime,
} from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { twJoin } from "tailwind-merge"
import { SelectItem } from "@/components/ui/Select"
import dayjs from "dayjs"
import { DirectionIcons } from "@/components/icons/Icons"
import { TimeZone } from "@/page/coffee-chat/create/CreateCoffeeChatReservationPage.types"
import TimeOptions from "./TimeOptions"
import { FaCalendarAlt } from "react-icons/fa"
import { revalidatePage } from "@/util/actions/revalidatePage"

interface MenteeProps {
  reservation: CoffeeChatReservationTime[]
  created: string
}

function ReservationForMentee({ reservation }: MenteeProps) {
  const [date, setDate] = useState<Value>(new Date(reservation[0].start_time))

  // // 오전 or 오후
  const [timeZone, setTimeZone] = useState<TimeZone>(TimeZone.AM)

  // 오전, 오후 선택 화살표 스타일
  const ArrowClassName = (disabled: boolean) =>
    twJoin([disabled && "text-slate-200"], [!disabled && "cursor-pointer"])

  const { ProgressModalView } = useProgressModal()

  useEffect(() => {
    return () => {
      revalidatePage("/chat", "page")
    }
  }, [])

  return (
    <section className="my-20 text-center">
      <ProgressModalView />
      <div className="font-bold text-primary text-[28px] mb-5">
        멘토링 가능 일시
      </div>
      <div className="font-bold text-secondary text-[20px] mb-5 flex justify-center items-center">
        <FaCalendarAlt />
        <div className="ml-2">날짜와 시간을 선택해주세요</div>
      </div>
      <div className="flex justify-around flex-wrap">
        <CustomCalendar
          start={reservation[0].start_time}
          limit={2}
          date={date}
          setDate={setDate}
          isClass={false}
        />
        <div>
          <div className="mt-3 text-xl text-secondary font-bold">
            {getDate({ date: date + "" })}
          </div>
          <div className="flex sm:min-w-[500px] justify-between">
            <DirectionIcons.Left
              className={ArrowClassName(timeZone === TimeZone.AM)}
              onClick={() => setTimeZone(TimeZone.AM)}
            />
            {timeZone === "AM" && (
              <div className="text-center">
                <div className="font-bold text-primary text-lg mb-5">오전</div>
                <TimeOptions
                  reservation={reservation}
                  cate="AM"
                  selectedDay={getDate({ date: reservation[0].start_time })}
                  date={date}
                />
              </div>
            )}
            {timeZone === "PM" && (
              <div className="text-center">
                <div className="font-bold text-primary text-lg mb-5">오후</div>
                <TimeOptions
                  reservation={reservation}
                  cate="PM"
                  selectedDay={getDate({ date: reservation[0].start_time })}
                  date={date}
                />
              </div>
            )}
            <DirectionIcons.Right
              className={ArrowClassName(timeZone === TimeZone.PM)}
              onClick={() => setTimeZone(TimeZone.PM)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReservationForMentee

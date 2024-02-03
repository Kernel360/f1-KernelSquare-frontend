"use client"

import { getDate, getHour, getTime } from "@/util/getDate"
import useModal from "@/hooks/useModal"
import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { toast } from "react-toastify"
import { errorMessage, notificationMessage } from "@/constants/message"
import { useProgressModal } from "@/hooks/useProgressModal"
import { useParams } from "next/navigation"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"
import Image from "next/image"
import { basic_profile } from "@/assets/images/basic"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { twJoin } from "tailwind-merge"
import { useClientSession } from "@/hooks/useClientSession"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import dayjs from "dayjs"
import { DirectionIcons } from "@/components/icons/Icons"
import { TimeZone } from "@/page/coffee-chat/create/CreateCoffeeChatReservationPage.types"
import TimeOptions from "./TimeOptions"
import { FaCalendarAlt } from "react-icons/fa"

interface MenteeProps {
  reservation: CoffeeChatReservationTime[]
  created: string
}

function ReservationForMentee({ reservation, created }: MenteeProps) {
  const params = useParams<{ id: string }>()
  // 데이터 받아오면 시작 날짜로 수정 필요
  const [date, setDate] = useState<Value>(new Date(reservation[0].start_time))
  console.log("start", getDate({ date: reservation[0].start_time }))

  const [selectedDay, setSelectedDay] = useState<string>(
    getDate({ date: reservation[0].start_time }),
  )

  // // 오전 or 오후
  const [timeZone, setTimeZone] = useState<TimeZone>(TimeZone.AM)
  // // 선택된 시간대
  // const [schedule, setSchedule] = useRecoilState(ScheduleList)

  // 오전, 오후 선택 화살표 스타일
  const ArrowClassName = (disabled: boolean) =>
    twJoin([disabled && "text-slate-200"], [!disabled && "cursor-pointer"])

  // 데이터 받아오면 실제 일정으로 수정 필요

  const { ProgressModalView } = useProgressModal()

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
        />
        <div>
          <div className="mt-3 text-xl text-secondary font-bold">
            {getDate({ date: date + "" })}
          </div>
          <div className="flex sm:min-w-[470px]">
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
                  selectedDay={selectedDay}
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
                  selectedDay={selectedDay}
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

interface SelectedDateProps {
  date: Value
  addNum: number
}

function SelectedDate({ date, addNum }: SelectedDateProps) {
  return (
    <SelectItem
      value={getDate({
        date: dayjs(date + "")
          .add(addNum, "day")
          .format(),
      })}
    >
      {getDate({
        date: dayjs(date + "")
          .add(addNum, "day")
          .format(),
      })}
    </SelectItem>
  )
}

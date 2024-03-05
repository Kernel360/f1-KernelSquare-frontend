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
import TimeOptions from "./TimeOptions"
import { FaCalendarAlt } from "react-icons/fa"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useClientSession } from "@/hooks/useClientSession"

interface MenteeProps {
  reservation: CoffeeChatReservationTime[]
  created: string
}

function ReservationForMentee({ reservation }: MenteeProps) {
  const [date, setDate] = useState<Value>(new Date(reservation[0].start_time))

  const { ProgressModalView } = useProgressModal()

  useEffect(() => {
    return () => {
      revalidatePage("/chat", "page")
    }
  }, [])

  const { user } = useClientSession()
  const isAlreadyReservedByMe = reservation.find(
    (res) => res.mentee_nickname === user?.nickname,
  )

  if (isAlreadyReservedByMe) {
    return <div></div>
  }

  return (
    <section className="my-20 text-center">
      <ProgressModalView />
      <div className="font-bold text-primary text-[28px] mb-5">
        멘토링 가능 일시
      </div>
      <div className="font-bold text-secondary text-[20px] mb-5 flex justify-center items-center">
        <FaCalendarAlt />
        <div className="ml-2">
          멘토님이 개설하신 시간대 중 원하시는 일시를 선택하세요.
        </div>
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
          <div className="flex justify-end w-full gap-2">
            <div className="font-normal mt-3 flex items-center">
              <div className="w-[10px] h-[10px] rounded bg-white border-[1px] border-slate-400 mr-1"></div>{" "}
              <div>예약 가능</div>
            </div>
            <div className="font-normal mt-3 flex items-center">
              <div className="w-[10px] h-[10px] rounded bg-slate-400 mr-1"></div>
              <div>예약 불가능</div>
            </div>
          </div>
          <div className="flex w-full justify-between mt-5 text-center">
            <TimeOptions
              reservation={reservation}
              selectedDay={getDate({ date: reservation[0].start_time })}
              date={date}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReservationForMentee

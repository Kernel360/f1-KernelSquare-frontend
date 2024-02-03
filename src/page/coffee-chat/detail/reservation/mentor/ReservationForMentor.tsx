"use client"

import { getDate, getTime } from "@/util/getDate"
import { CircleIcons } from "@/components/icons/Icons"
import { basic_profile } from "@/assets/images/basic"
import Image from "next/image"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { useParams, useRouter } from "next/navigation"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"
import type { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"

interface MentorProps {
  reservation: CoffeeChatReservationTime[]
  created: string
}

function ReservationForMentor({ reservation, created }: MentorProps) {
  const [date, setDate] = useState<Value>(new Date())
  const params = useParams<{ id: string }>()
  // 실제 데이터 반영 시 삭제 예정
  return (
    <section className="text-center mb-20">
      <div className="font-bold text-primary text-[28px] mb-5">SCHEDULE</div>
      <CustomCalendar limit={2} start={created} date={date} setDate={setDate} />
      <div className="my-10 text-xl text-secondary font-bold">
        {getDate({ date: date + "" })}
      </div>
      <div className="w-[50%] m-auto max-h-[300px] overflow-scroll px-4 py-3 border-[1px] border-primary flex justify-center gap-10">
        <div>
          {reservation.map((time) => (
            <div
              key={time.reservation_id}
              className="flex justify-around w-full flex-wrap min-h-[50px] my-5"
            >
              <div className="flex items-center">
                <CircleIcons.Line />
                <div className="ml-2 text-[20px]">
                  {getTime(time.start_time)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {reservation.map((time) => (
            <ReservedTime time={time} key={time.reservation_id} />
          ))}
        </div>
      </div>
    </section>
  )
}

type ReservedTimeProps = {
  time: CoffeeChatReservationTime
}

function ReservedTime({ time }: ReservedTimeProps) {
  if (time.menti_nickname)
    return (
      <div className="flex justify-around w-full flex-wrap min-h-[50px] my-5">
        <div className="relative w-[50px] h-[50px] rounded-full mr-3 shrink-0 translate-x-0 translate-y-0">
          <Image
            src={time.menti_image_url || basic_profile}
            alt="예약자 프로필 사진"
            fill
            sizes="auto"
            className="rounded-full"
          />
        </div>
        <div>
          <div className="font-bold text-left">{time.menti_nickname} 님</div>
          <div>과(와)의 멘토링이 예정되어 있습니다.</div>
        </div>
      </div>
    )
}

export default ReservationForMentor

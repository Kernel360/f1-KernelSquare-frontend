"use client"

import { getDate, getDay, getTime } from "@/util/getDate"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "../Calendar.css"
import { CircleIcons } from "@/components/icons/Icons"
import { basic_profile } from "@/assets/images/basic"
import Image from "next/image"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { useParams } from "next/navigation"

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

function ReservationForMentor() {
  const params = useParams<{ id: string }>()
  const [date, setDate] = useState<Value>(new Date())
  return (
    <section className="text-center mb-20">
      <div className="font-bold text-primary text-[28px] mb-5">SCHEDULE</div>
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
          // 날짜 타일에 추가할 컨텐츠
          // tileContent={}
        />
      </div>
      <div className="my-10 text-xl text-secondary font-bold">
        {getDate({ date: date + "" })}
      </div>
      <div className="w-[50%] m-auto max-h-[300px] overflow-scroll px-4 py-3 border-[1px] border-primary flex justify-center gap-10">
        <div>
          {mockCoffeeChatReservations[Number(params.id)].date_times.map((s) => (
            <div
              key={s.reservation_id}
              className="flex justify-around w-full flex-wrap min-h-[50px] my-5"
            >
              <div className="flex items-center">
                <CircleIcons.Line />
                <div className="ml-2 text-[20px]">{getTime(s.start_time)}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {mockCoffeeChatReservations[Number(params.id)].date_times.map((s) => (
            <div
              key={s.reservation_id}
              className="flex justify-around w-full flex-wrap min-h-[50px] my-5"
            >
              <div className="flex">
                {s.menti_nickname && (
                  <>
                    <div className="relative w-[50px] h-[50px] rounded-full mr-3 shrink-0 translate-x-0 translate-y-0">
                      <Image
                        src={s.menti_image_url || basic_profile}
                        alt="예약자 프로필 사진"
                        fill
                        sizes="auto"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-left">
                        {s.menti_nickname}
                      </div>
                      <div>과(와)의 멘토링이 예정되어 있습니다.</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReservationForMentor

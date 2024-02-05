"use client"

import { getDate, getTime } from "@/util/getDate"
import { CircleIcons } from "@/components/icons/Icons"
import { basic_profile } from "@/assets/images/basic"
import Image from "next/image"
import { mockCoffeeChatReservations } from "@/mocks/db/coffee-chat"
import { useParams, useRouter } from "next/navigation"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useEffect, useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"
import type { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { twJoin } from "tailwind-merge"
import CoffeeChat from "@/components/shared/animation/CoffeeChat"
import { revalidatePage } from "@/util/actions/revalidatePage"

interface MentorProps {
  reservation: CoffeeChatReservationTime[]
  created: string
}

function ReservationForMentor({ reservation, created }: MentorProps) {
  const [date, setDate] = useState<Value>(new Date(reservation[0].start_time))
  const isReserved = (nickname: string | null) =>
    twJoin(["ml-2 text-[20px]"], [nickname && "text-primary font-bold"])
  const target = reservation.filter(
    ({ start_time }) =>
      getDate({ date: date + "" }) === getDate({ date: start_time }),
  )
  console.log("res", reservation)

  useEffect(() => {
    return () => {
      revalidatePage("/chat", "page")
    }
  }, [])

  return (
    <section className="text-center mb-20">
      <div className="font-bold text-primary text-[28px] mb-5">SCHEDULE</div>
      <div className="flex justify-around flex-wrap">
        <div>
          <CustomCalendar
            limit={2}
            start={reservation[0].start_time}
            date={date}
            setDate={setDate}
            isClass
          />{" "}
          <div className="flex justify-between">
            <div className="font-normal mt-3 flex items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[#fbf8ce] border-[1px] border-[orange] mr-1"></div>{" "}
              <div>멘티 모집 기간</div>
            </div>
            <div className="font-normal mt-3 flex items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-[lightgray] mr-1"></div>{" "}
              <div>예약 확정 기간</div>
            </div>
            <div className="font-normal mt-3 flex items-center">
              <div className="w-[10px] h-[10px] rounded-full bg-primary mr-1"></div>{" "}
              <div>멘토링 진행 기간</div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-3 text-xl text-secondary font-bold">
            {getDate({ date: date + "" })}
          </div>
          <div className="m-auto max-h-[300px] min-w-[456px] overflow-scroll px-4 py-3 border-[1px] border-primary flex justify-center gap-10">
            {!target.length && (
              <div className="w-full m-auto text-center">
                <div className="flex justify-center mb-5">
                  <CoffeeChat className="w-[250px]" />
                </div>
                <div>예약된 커피챗이</div>
                <div>존재하지 않습니다.</div>
              </div>
            )}
            {!!target.length && (
              <div>
                {target.map((time) => (
                  <div
                    key={time.reservation_id}
                    className="flex justify-around w-full flex-wrap min-h-[50px] my-5"
                  >
                    <div className="flex items-center">
                      <CircleIcons.Line />
                      <div className={isReserved(time.menti_nickname)}>
                        {getTime(time.start_time)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!!target.length && (
              <div>
                {target.map((time) => (
                  <ReservedTime time={time} key={time.reservation_id} />
                ))}
              </div>
            )}
          </div>
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

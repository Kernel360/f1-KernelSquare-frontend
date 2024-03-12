"use client"

import { getDate, getTime } from "@/util/getDate"
import { CircleIcons } from "@/components/icons/Icons"
import { basic_profile } from "@/assets/images/basic"
import Image from "next/image"
import CustomCalendar from "../CustomCalendar/CustomCalendar"
import { useEffect, useState } from "react"
import type { Value } from "../CustomCalendar/Calendar.types"
import type { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { twJoin } from "tailwind-merge"
import CoffeeChat from "@/components/shared/animation/CoffeeChat"
import { revalidatePage } from "@/util/actions/revalidatePage"
import EnterCoffeeChatButton from "../../EnterCoffeeChat/EnterCoffeeChatButton"

interface MentorProps {
  reservation: CoffeeChatReservationTime[]
  created: string
  title: string
}

function ReservationForMentor({ reservation, created, title }: MentorProps) {
  const [date, setDate] = useState<Value>(
    new Date(reservation[0].reservation_start_time),
  )
  const isReserved = (nickname: string | null) =>
    twJoin(
      ["ml-2 text-[20px] shrink-0"],
      [nickname && "text-primary font-bold"],
    )
  const target = reservation.filter(
    ({ reservation_start_time }) =>
      getDate({ date: date + "" }) ===
      getDate({ date: reservation_start_time }),
  )

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
            start={reservation[0].reservation_start_time}
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
          <div className="max-h-[300px] overflow-auto border-[1px] border-primary flex justify-center">
            {!target.length && (
              <div className="w-[35vw] m-auto text-center py-5">
                <div className="flex justify-center mb-5">
                  <CoffeeChat className="w-[250px]" />
                </div>
                <div>예약된 커피챗이</div>
                <div>존재하지 않습니다.</div>
              </div>
            )}
            {!!target.length && (
              <div className="flex flex-col w-full px-4">
                {target.map((time) => (
                  <div
                    key={time.reservation_id}
                    className="flex gap-4 justify-between w-full min-h-[50px] my-5"
                  >
                    <div className="flex items-center">
                      <CircleIcons.Line className="shrink-0" />
                      <div className={isReserved(time.mentee_nickname)}>
                        {getTime(time.reservation_start_time)}
                      </div>
                    </div>
                    <ReservedTime
                      time={time}
                      key={time.reservation_id}
                      title={title}
                      reservation_id={time.reservation_id}
                    />
                  </div>
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
  title: string
  reservation_id: number
}

function ReservedTime({ time, title, reservation_id }: ReservedTimeProps) {
  if (time && time.mentee_nickname)
    return (
      <div className="flex-1 flex justify-around w-full flex-wrap min-h-[50px] my-5 items-center gap-2">
        <div className="relative w-[50px] h-[50px] rounded-full mr-3 shrink-0 translate-x-0 translate-y-0">
          <Image
            src={time.mentee_image_url || basic_profile}
            alt="예약자 프로필 사진"
            fill
            sizes="auto"
            className="rounded-full"
          />
        </div>
        <div>
          <div>
            <div className="font-bold text-left">{time.mentee_nickname} 님</div>
          </div>
          <div>과(와)의 멘토링이 예정되어 있습니다.</div>
        </div>
        <div>
          <EnterCoffeeChatButton
            articleTitle={title}
            roomId={time.room_id}
            startTime={time.reservation_start_time}
            reservation_id={reservation_id}
            className="px-2 py-2 w-max shrink-0 font-semibold text-sm underline bg-transparent sm:bg-primary sm:no-underline sm:text-white"
          />
        </div>
      </div>
    )
}

export default ReservationForMentor

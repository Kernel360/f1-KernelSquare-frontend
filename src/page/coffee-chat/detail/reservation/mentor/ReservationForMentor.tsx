"use client"

import { getDate, getTime } from "@/util/getDate"
import { CircleIcons } from "@/components/icons/Icons"
import { basic_profile } from "@/assets/images/basic"
import Image from "next/image"
import { useEffect } from "react"
import type { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { twJoin } from "tailwind-merge"
import CoffeeChat from "@/components/shared/animation/CoffeeChat"
import { revalidatePage } from "@/util/actions/revalidatePage"
import dynamic from "next/dynamic"
import ReservationCalendar from "../calendar/ReservationCalendar"
import { useRecoilValue } from "recoil"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import SelectedReservationTime from "../mentee/SelectedReservationTime"
import DetailPageCalendarWrapper from "../DetailPageCalendarWrapper"
import ChatAuthorCalendar from "../calendar/ChatAuthorCalendar"

interface MentorProps {
  reservation: CoffeeChatReservationTime[]
  created: string
  title: string
}

const EnterCoffeeChatButton = dynamic(
  () =>
    import("@/page/coffee-chat/detail/EnterCoffeeChat/EnterCoffeeChatButton"),
  {
    ssr: false,
    loading(loadingProps) {
      return (
        <button className="skeleton w-[108px] h-[36px]">
          <span></span>
        </button>
      )
    },
  },
)

function ReservationForMentor({ reservation, created, title }: MentorProps) {
  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)
  const startTime = reservation[0].start_time
  const date = selectedDate ?? startTime

  const isReserved = (nickname: string | null) =>
    twJoin(["shrink-0 w-[48px]"], [nickname && "text-primary font-bold"])
  const target = reservation.filter(
    ({ start_time }) =>
      getDate({ date: date + "" }) === getDate({ date: start_time }),
  )

  useEffect(() => {
    return () => {
      revalidatePage("/chat", "page")
    }
  }, [])

  return (
    <section className="text-center">
      <div className="font-bold text-primary text-[28px] mb-5">SCHEDULE</div>
      <DetailPageCalendarWrapper
        calendarComponent={
          <div>
            <ChatAuthorCalendar startTime={reservation[0].start_time} />{" "}
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
                <div>커피챗 진행 기간</div>
              </div>
            </div>
          </div>
        }
        dataComponent={
          <div>
            <SelectedReservationTime startTime={startTime} />
            <div className="border border-primary flex justify-center">
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
                <ul className="flex flex-col w-full gap-4">
                  {target.map((time) => (
                    <li
                      key={time.reservation_id}
                      className={`flex p-4 gap-4 w-full h-max items-center ${
                        time?.mentee_nickname
                          ? "hover:bg-info"
                          : "hover:bg-transparent"
                      }`}
                    >
                      <div className="flex h-full items-center gap-1">
                        <CircleIcons.Line className="text-[8px] shrink-0" />
                        <div className={isReserved(time.mentee_nickname)}>
                          {getTime(time.start_time)}
                        </div>
                      </div>
                      <ReservedTime
                        time={time}
                        key={time.reservation_id}
                        title={title}
                        reservation_id={time.reservation_id}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        }
      />
    </section>
  )
}

type ReservedTimeProps = {
  time: CoffeeChatReservationTime
  title: string
  reservation_id: number
}

function ReservedTime({ time, title, reservation_id }: ReservedTimeProps) {
  if (time && time.mentee_nickname) {
    return (
      <div className="flex-1 flex flex-col sm:flex-row justify-between w-full items-center gap-2">
        <div className="flex gap-2 items-center">
          <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0">
            <Image
              src={time.mentee_image_url || basic_profile}
              alt="예약자 프로필 사진"
              fill
              sizes="auto"
              className="object-cover"
            />
          </div>
          <span className="text-sm whitespace-normal sm:whitespace-pre-line text-left">
            <span className="font-bold">{time.mentee_nickname} 님</span>
            <span>{`\n과(와)의 커피챗이 예정되어 있습니다.`}</span>
          </span>
        </div>
        <EnterCoffeeChatButton
          articleTitle={title}
          roomId={time.room_id}
          startTime={time.start_time}
          reservation_id={reservation_id}
          className="self-end sm:self-auto h-fit px-2 py-1 sm:py-2 w-max shrink-0 font-semibold text-sm bg-primary text-white"
        />
      </div>
    )
  }

  return null
}

export default ReservationForMentor

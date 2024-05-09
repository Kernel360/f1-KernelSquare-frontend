"use client"

import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { getDate } from "@/util/getDate"
import { useRecoilValue } from "recoil"
import CoffeeChatAnimation from "@/components/shared/animation/CoffeeChat"
import ReservedTime from "./ReservedTime"

interface TimeOptionProps {
  startTime: string
  reservation: CoffeeChatReservationTime[]
  chatTitle: string
}

function ReservedTimes({ startTime, reservation, chatTitle }: TimeOptionProps) {
  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  const targetReservation = reservation.filter(
    (reservation) =>
      getDate({ date: reservation.start_time }) ===
      getDate({ date: selectedDate ? selectedDate.toString() : startTime }),
  )

  if (!targetReservation?.length) {
    return (
      <ReservedTimesWrapper>
        <div className="w-full sm:my-auto text-center">
          <div className="flex justify-center mb-5">
            <CoffeeChatAnimation className="w-[250px]" />
          </div>
          <div>예약된 커피챗이</div>
          <div>존재하지 않습니다.</div>
        </div>
      </ReservedTimesWrapper>
    )
  }

  return (
    <ReservedTimesWrapper>
      <ul className="flex flex-col w-full">
        {targetReservation.map((time) => (
          <li
            key={time.reservation_id}
            className={`flex px-4 gap-4 w-full h-24 shrink-0`}
          >
            <ReservedTime
              time={time}
              chatTitle={chatTitle}
              reservation_id={time.reservation_id}
            />
          </li>
        ))}
      </ul>
      <div className="w-full h-9 shrink-0" />
    </ReservedTimesWrapper>
  )
}

export default ReservedTimes

const ReservedTimesWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-fit overflow-auto sm:h-[382px]">
      {children}
    </div>
  )
}

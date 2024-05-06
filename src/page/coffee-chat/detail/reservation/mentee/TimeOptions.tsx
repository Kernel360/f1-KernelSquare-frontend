"use client"

import { getDate } from "@/util/getDate"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { useClientSession } from "@/hooks/useClientSession"
import { useRecoilValue } from "recoil"
import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { useId } from "react"
import TimeOptionButton from "./reservation-time/TimeOptionButton"
import { useParams } from "next/navigation"
import { useMatchedRoom } from "@/page/qna-detail/hooks/useMatchedRoom"
import Lottie from "lottie-react"
import calendarLoading from "@/assets/lottie/calendar-loading.json"

interface TimeOptionsProps {
  startTime: string
  reservation: CoffeeChatReservationTime[]
}

const TimeOptions = ({ startTime, reservation }: TimeOptionsProps) => {
  const params = useParams()
  const timeUniqueId = useId()

  const { user } = useClientSession()

  const { matchedRoom, pending } = useMatchedRoom({
    coffeeChatId: Number(params.id),
  })

  const selectedDate = useRecoilValue(ReservationSelectedDateAtom)

  const targetReservation = reservation.filter(
    (reservation) =>
      getDate({ date: reservation.start_time }) ===
      getDate({ date: selectedDate ? selectedDate.toString() : startTime }),
  )

  // 해당 일자에 커피챗 일정이 없는 경우
  if (!targetReservation?.length) {
    return (
      <div className="w-full text-center text-slate-300">
        가능한 커피챗 일정이 없습니다.
      </div>
    )
  }

  if (pending) {
    return (
      <div>
        <Lottie animationData={calendarLoading} />
      </div>
    )
  }

  return (
    <div className="w-full grid grid-cols-4 sm:grid-cols-2 pc:grid-cols-4 gap-2 shrink-0 m-auto">
      {targetReservation.map((reservation) => (
        <TimeOptionButton
          key={`${timeUniqueId}-reservation-${reservation.reservation_id}`}
          user={user}
          articleId={Number(params.id)}
          reservationInfo={reservation}
          matchedRoom={matchedRoom}
        />
      ))}
    </div>
  )
}

export default TimeOptions

"use client"

import { useClientSession } from "@/hooks/useClientSession"
import ReservationForMentee from "./mentee/ReservationForMentee"
import ReservationForMentor from "./mentor/ReservationForMentor"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"

interface ScheduleMentoringSessionProps {
  authorId: number
  reservation: CoffeeChatReservationTime[]
  createdAt: string
  title: string
}

function ScheduleMentoringSession({
  authorId,
  reservation,
  createdAt,
  title,
}: ScheduleMentoringSessionProps) {
  const { user } = useClientSession()

  const isCoffeeChatAuthor = user ? user.member_id === authorId : false

  if (isCoffeeChatAuthor) {
    return (
      <ReservationForMentor
        reservation={reservation}
        created={createdAt}
        title={title}
      />
    )
  }

  return <ReservationForMentee reservation={reservation} />
}

export default ScheduleMentoringSession

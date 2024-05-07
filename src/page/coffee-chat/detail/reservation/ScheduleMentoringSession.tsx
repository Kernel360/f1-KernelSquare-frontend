"use client"

import { useClientSession } from "@/hooks/useClientSession"
import ReservationForMentee from "./mentee/ReservationForMentee"
import ReservationForMentor from "./mentor/ReservationForMentor"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"

interface ScheduleMentoringSessionProps {
  authorId: number
  reservation: CoffeeChatReservationTime[]
  title: string
}

function ScheduleMentoringSession({
  authorId,
  reservation,
  title,
}: ScheduleMentoringSessionProps) {
  const { user } = useClientSession()

  const isCoffeeChatAuthor = user ? user.member_id === authorId : false

  if (isCoffeeChatAuthor) {
    return <ReservationForMentor reservation={reservation} title={title} />
  }

  return <ReservationForMentee reservation={reservation} />
}

export default ScheduleMentoringSession

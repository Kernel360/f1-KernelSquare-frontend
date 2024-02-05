"use client"

import { useClientSession } from "@/hooks/useClientSession"
import ReservationForMentee from "./mentee/ReservationForMentee"
import ReservationForMentor from "./mentor/ReservationForMentor"
import {
  CoffeeChatReservationDetailPayload,
  CoffeeChatReservationTime,
} from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"

interface ScheduleMentoringSessionProps {
  mentor: number
  reservation: CoffeeChatReservationTime[]
  created: string
}

function ScheduleMentoringSession({
  mentor,
  reservation,
  created,
}: ScheduleMentoringSessionProps) {
  const { user } = useClientSession()

  const isMyCoffeeChat =
    user?.roles.includes("ROLE_MENTOR") && mentor === user.member_id

  if (isMyCoffeeChat)
    return <ReservationForMentor reservation={reservation} created={created} />
  else
    return <ReservationForMentee reservation={reservation} created={created} />
}

export default ScheduleMentoringSession

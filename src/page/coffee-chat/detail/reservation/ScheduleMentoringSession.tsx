"use client"

import { useClientSession } from "@/hooks/useClientSession"
import ReservationForMentee from "./mentee/ReservationForMentee"
import ReservationForMentor from "./mentor/ReservationForMentor"

interface ScheduleMentoringSessionProps {
  mentor: number
}

function ScheduleMentoringSession({ mentor }: ScheduleMentoringSessionProps) {
  const { user } = useClientSession()

  const isMyCoffeeChat =
    user?.roles.includes("ROLE_MENTOR") && mentor === user.member_id

  if (isMyCoffeeChat) return <ReservationForMentor />
  else return <ReservationForMentee />
}

export default ScheduleMentoringSession

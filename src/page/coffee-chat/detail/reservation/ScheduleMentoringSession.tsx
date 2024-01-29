"use client"

import { useClientSession } from "@/hooks/useClientSession"
import ReservationForMentee from "./mentee/ReservationForMentee"
import ReservationForMentor from "./mentor/ReservationForMentor"

function ScheduleMentoringSession() {
  const { user } = useClientSession()

  const isMyCoffeeChat = user?.roles.includes("ROLE_MENTOR")

  if (isMyCoffeeChat) return <ReservationForMentor />
  else return <ReservationForMentee />
}

export default ScheduleMentoringSession

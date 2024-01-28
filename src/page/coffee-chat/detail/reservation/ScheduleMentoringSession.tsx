"use client"

import { useClientSession } from "@/hooks/useClientSession"
import ReservationForMentee from "./mentee/ReservationForMentee"
import ReservationForMentor from "./mentor/ReservationForMentor"

function ScheduleMentoringSession() {
  const { user } = useClientSession()

  const role = user?.roles[0]
  console.log("role", role)

  if (role === "ROLE_MENTOR") return <ReservationForMentor />
  else return <ReservationForMentee />
}

export default ScheduleMentoringSession

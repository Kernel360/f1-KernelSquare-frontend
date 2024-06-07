"use client"

import { ReservationSelectedDateAtom } from "@/recoil/atoms/coffee-chat/date"
import { getChatPeriods } from "@/util/chat/time"
import dayjs from "dayjs"
import { useMemo } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"

export function useSelectedChatTime() {
  const [selectedDate, setSelectedDate] = useRecoilState(
    ReservationSelectedDateAtom,
  )

  const resetSelectedDate = useResetRecoilState(ReservationSelectedDateAtom)

  const coffeeChatPeriods = useMemo(() => {
    if (!selectedDate) return null

    const periods = getChatPeriods({
      startTime: dayjs(selectedDate as Date).toString(),
    })

    const {
      reservationPossible: [reservationPossibleStart, reservationPossibleEnd],
      reservationConfirm,
      chat: [chatStart, chatEnd],
    } = periods

    return {
      reservationPossible: {
        start: reservationPossibleStart,
        end: reservationPossibleEnd,
      },
      reservationConfirm,
      chat: {
        start: chatStart,
        end: chatEnd,
      },
    }
  }, [selectedDate])

  return {
    selectedDate,
    setSelectedDate,
    resetSelectedDate,
    coffeeChatPeriods,
  }
}

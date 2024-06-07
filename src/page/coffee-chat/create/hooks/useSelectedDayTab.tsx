"use client"

import { SelectedDayTab } from "@/recoil/atoms/coffee-chat/date"
import { getChatPeriods } from "@/util/chat/time"
import dayjs from "dayjs"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { useSelectedChatTime } from "./useSelectedChatTime"

export function useSelectedDayTab() {
  const { selectedDate } = useSelectedChatTime()
  const [selectedDayTab, setSelectedDayTab] = useRecoilState(SelectedDayTab)

  const selectedDayTabOptions = useMemo(() => {
    if (!selectedDate) return null

    const {
      chat: [chatStart, chatEnd],
    } = getChatPeriods({ startTime: dayjs(selectedDate as Date).format() })

    return [
      chatStart.format("YYYY-MM-DD"),
      chatStart.add(1, "days").format("YYYY-MM-DD"),
      chatEnd.format("YYYY-MM-DD"),
    ]
  }, [selectedDate])

  return {
    selectedDayTab,
    setSelectedDayTab,
    selectedDayTabOptions,
  }
}

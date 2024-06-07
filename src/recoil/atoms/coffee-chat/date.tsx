import { Value } from "@/interfaces/calendar"
import { atom } from "recoil"

type SelectedDate = Value

export const MAXIMUM_SELCTE_CHAT_TIME_NUM = 10

export const ReservationSelectedDateAtom = atom<SelectedDate>({
  key: "chat-reservation-selected-date-atom",
  default: null,
})

export const SelectedDayTab = atom<SelectedDate | null>({
  key: "selected-day-tab-atom",
  default: null,
})

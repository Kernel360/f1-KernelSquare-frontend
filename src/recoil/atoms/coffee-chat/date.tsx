import { Value } from "@/interfaces/calendar"
import { atom } from "recoil"

type SelectedDate = Value

export const ReservationSelectedDateAtom = atom<SelectedDate>({
  key: "chat-reservation-selected-date-atom",
  default: null,
})

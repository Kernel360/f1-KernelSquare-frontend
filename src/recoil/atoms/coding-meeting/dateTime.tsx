import { Value } from "@/interfaces/calendar"
import { atom } from "recoil"

export type Time = {
  range: string
  hour: string
  minute: string
}

export const StartTime = atom<Time>({
  key: "coding-meeting-start-time-atom",
  default: {
    range: "",
    hour: "",
    minute: "",
  },
})

export const EndTime = atom<Time>({
  key: "coding-meeting-end-time-atom",
  default: {
    range: "",
    hour: "",
    minute: "",
  },
})

export const CodingMeetingDay = atom<Value>({
  key: "coding-meeting-day-atom",
  default: new Date(),
})

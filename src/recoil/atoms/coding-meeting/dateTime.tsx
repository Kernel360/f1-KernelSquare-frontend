import { Value } from "@/interfaces/calendar"
import dayjs from "dayjs"
import { atom } from "recoil"

export type Time = {
  range: string
  hour: string
  minute: string
}

export const StartTime = atom<Time>({
  key: "coding-meeting-start-time-atom",
  default: undefined,
})

export const EndTime = atom<Time>({
  key: "coding-meeting-end-time-atom",
  default: undefined,
})

export const CodingMeetingDay = atom<Value>({
  key: "coding-meeting-day-atom",
  default: new Date(),
})

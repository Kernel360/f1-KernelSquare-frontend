import { atom } from "recoil"

export const ScheduleList = atom<string[]>({
  key: "Schedule-atom",
  default: [],
})

import { Value } from "@/page/coffee-chat/create/components/CustomCalendar/Calendar.types"
import { atom, atomFamily } from "recoil"

export const ScheduleList = atom<string[]>({
  key: "Schedule-atom",
  default: [],
})

interface ScheduleListState {
  schedule: string[]
}

export const ScheduleListAtomFamily = atomFamily<ScheduleListState, string>({
  key: "answer-editor-atom-family",
  default: {
    schedule: [],
  },
})

export const CoffeeChatStartDate = atom<Value | undefined>({
  key: "coffee-chat-start-date-atom",
  default: undefined,
})

export const SelectedDate = atom<string>({
  key: "selected-date-atom",
  default: "",
})

export const TimeCount = atom<number>({
  key: "selected-time-count",
  default: 0,
})

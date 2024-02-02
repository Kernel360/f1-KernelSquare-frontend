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

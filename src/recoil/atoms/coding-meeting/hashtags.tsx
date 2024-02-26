import { atom } from "recoil"

export const CodingMeetingHashTagList = atom<string[]>({
  key: "CodingMeeting-HashTagList-atom",
  default: [],
})

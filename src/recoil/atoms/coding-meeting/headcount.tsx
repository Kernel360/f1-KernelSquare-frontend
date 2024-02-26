import { atom } from "recoil"

export const CodingMeetingHeadCount = atom<string>({
  key: "CodingMeeting-HeadCount-atom",
  default: "3",
})

import { atom } from "recoil"

export const HashTagList = atom<string[]>({
  key: "HashTagList-atom",
  default: [],
})

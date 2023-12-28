import { atom } from "recoil"

export const EditMode = atom<boolean>({
  key: "EditMode-atom",
  default: false,
})

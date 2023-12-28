import { atom } from "recoil"

export const Introduction = atom<string>({
  key: "Introductoin-atom",
  default: "",
})
export const ProfileImage = atom<string>({
  key: "ProfileImage-atom",
  default: "",
})

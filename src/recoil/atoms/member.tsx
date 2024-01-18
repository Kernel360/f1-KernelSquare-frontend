import { atom } from "recoil"

export const Introduction = atom<string>({
  key: "Introductoin-atom",
  default: "",
})

export const TextLen = atom<number>({ key: "TextLen-atom", default: 0 })

export const ProfileImage = atom<string>({
  key: "ProfileImage-atom",
  default: "",
})

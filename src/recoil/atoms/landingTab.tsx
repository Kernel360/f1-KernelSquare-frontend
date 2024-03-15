import { atom } from "recoil"

const landingTabAtom = atom<string | undefined>({
  key: "landing-tab-atom",
  default: undefined,
})

export default landingTabAtom

import { atom } from "recoil"

type MenuOpenState = boolean

export const HeaderMobileMenuOpenAtom = atom<MenuOpenState>({
  key: "header-mobile-menu-open-atom",
  default: false,
})

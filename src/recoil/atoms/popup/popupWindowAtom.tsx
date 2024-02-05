"use client"

import { atom } from "recoil"

export const popupWindowAtom = atom<Window | null>({
  key: "kernel-square-popup-window",
  default: null,
})

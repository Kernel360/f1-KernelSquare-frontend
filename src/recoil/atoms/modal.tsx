"use client"

import { ModalState } from "@/interfaces/modal"
import { atom } from "recoil"

export const modalDefaultState: ModalState = {
  open: false,
  containsHeader: true,
  closeableDim: true,
  content: null,
  classNames: undefined,
  onClose: undefined,
}

export const modalState = atom<ModalState>({
  key: "modal-atom",
  default: {
    ...modalDefaultState,
  },
})

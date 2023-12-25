"use client"

import { ModalState } from "@/interfaces/modal"
import { modalDefaultState, modalState } from "@/recoil/atoms/modal"
import { useCallback } from "react"
import { useRecoilState } from "recoil"

type OpenModalPayload = {
  classNames?: ModalState["classNames"]
  containsHeader?: ModalState["containsHeader"]
  closeableDim?: ModalState["closeableDim"]
  content: NonNullable<ModalState["content"]>
  onClose?: ModalState["onClose"]
}

function useModal() {
  const [modal, setModal] = useRecoilState(modalState)

  const openModal = useCallback(
    ({
      content,
      containsHeader = true,
      closeableDim = true,
      classNames,
      onClose,
    }: OpenModalPayload) => {
      setModal((prev) => ({
        ...prev,
        open: true,
        ...(classNames && { classNames }),
        containsHeader,
        closeableDim,
        content,
        onClose,
      }))
    },
    [setModal],
  )

  const closeModal = useCallback(() => {
    modal.onClose && modal.onClose()

    setModal((prev) => ({
      ...prev,
      ...modalDefaultState,
    }))
  }, [setModal, modal])

  return {
    modal,
    openModal,
    closeModal,
  }
}

export default useModal

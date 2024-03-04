"use client"

import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"
import ConfirmModalMessage, { type MessageKey } from "./ConfirmModalMessage"

type BasicFunc = () => void
type PromiseFunc = () => Promise<void>

interface ConfirmModalProps {
  onSuccess: BasicFunc | PromiseFunc
  onCancel?: BasicFunc | PromiseFunc
  situation: MessageKey
}

function ConfirmModal({ ...props }: ConfirmModalProps) {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    openModal({
      containsHeader: false,
      closeableDim: false,
      content: <ConfirmModal.ModalContent {...props} />,
    })

    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return null
}

ConfirmModal.ModalContent = function ConfirmModal({
  onSuccess,
  onCancel,
  situation,
}: ConfirmModalProps) {
  const { closeModal } = useModal()

  const handleSubmit = () => {
    onSuccess()
    closeModal()
  }
  const handleCancle = () => {
    if (onCancel) onCancel()
    closeModal()
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">{ConfirmModalMessage[situation]}</p>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center">
        <Button
          buttonTheme="primary"
          className="py-2 px-4 mr-3"
          onClick={handleSubmit}
        >
          확인
        </Button>
        <Button
          buttonTheme="third"
          className="py-2 px-4"
          onClick={handleCancle}
        >
          취소
        </Button>
      </div>
    </div>
  )
}

export default ConfirmModal

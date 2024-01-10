"use client"

import Button from "../../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../../Spacing"
import { confirmMessage, notificationMessage } from "@/constants/message"
import { toast } from "react-toastify"

interface Props {
  onSuccess: () => Promise<void>
  onCancel: () => Promise<void>
}

function UploadProfileImageModal({ onSuccess, onCancel }: Props) {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    openModal({
      containsHeader: false,
      closeableDim: false,
      content: (
        <UploadProfileImageModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      ),
    })

    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return null
}

UploadProfileImageModal.ModalContent = function UploadProfileImageModal({
  onSuccess,
  onCancel,
}: Props) {
  const { closeModal } = useModal()

  const handleSubmit = () => {
    onSuccess()
    closeModal()
  }
  const handleCancle = () => {
    onCancel()
    closeModal()
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">{confirmMessage.editProfileImage}</p>
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

export default UploadProfileImageModal

"use client"

import { useRouter } from "next/navigation"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"

function UserProfileGuardModal() {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    openModal({
      containsHeader: false,
      closeableDim: false,
      content: <UserProfileGuardModal.ModalContent />,
    })

    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return null
}

UserProfileGuardModal.ModalContent = function AskQuestionModalContent() {
  const { replace } = useRouter()

  const onClose = () => {
    replace("/")

    return
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        로그인 후
        <br />
        해당 유저 프로필 조회가 가능합니다
      </p>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center">
        <Button buttonTheme="primary" onClick={onClose}>
          홈으로
        </Button>
      </div>
    </div>
  )
}

export default UserProfileGuardModal

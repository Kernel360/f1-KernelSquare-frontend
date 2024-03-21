"use client"

import { useRouter } from "next/navigation"
import Spacing from "../Spacing"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"

function OAuthGuardModal() {
  const { replace } = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    replace("/qna?page=0")

    setTimeout(() => {
      openModal({
        containsHeader: false,
        closeableDim: false,
        content: <OAuthGuardModal.ModalContent />,
      })
    }, 0)
  }, []) /* eslint-disable-line */

  return null
}

OAuthGuardModal.ModalContent = function SignupGuardModalContent() {
  const { closeModal } = useModal()

  const onClose = () => {
    closeModal()

    return
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        이미 로그인 되어 있어
        <br />
        소셜 로그인을 진행할 수 없습니다
      </p>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center">
        <Button buttonTheme="primary" onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  )
}

export default OAuthGuardModal

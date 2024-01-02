"use client"

import { useRouter } from "next/navigation"
import Spacing from "../Spacing"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"

function SignupGuardModal() {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    openModal({
      containsHeader: false,
      closeableDim: false,
      content: <SignupGuardModal.ModalContent />,
    })

    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return null
}

SignupGuardModal.ModalContent = function SignupGuardModalContent() {
  const { replace } = useRouter()

  const onClose = () => {
    replace("/")

    return
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        이미 로그인 되어 있어
        <br />
        가입을 진행할 수 없습니다
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

export default SignupGuardModal

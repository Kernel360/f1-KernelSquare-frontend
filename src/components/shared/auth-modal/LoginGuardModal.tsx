"use client"

import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"
import Button from "../button/Button"
import { redirect } from "next/navigation"
import { getHistorySessionPath } from "@/util/historySession/path"

function LoginGuardModal() {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    setTimeout(() => {
      openModal({
        containsHeader: false,
        closeableDim: false,
        content: <LoginGuardModal.ModalContent onClose={closeModal} />,
      })
    }, 0)

    const prevPath = getHistorySessionPath()?.prevPath

    redirect(prevPath ?? "/qna?page=0")
  }, []) /* eslint-disable-line */

  return null
}

export default LoginGuardModal

LoginGuardModal.ModalContent = function LoginGuardModalContent({
  onClose,
}: {
  onClose: () => void
}) {
  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        이미 로그인 되어 있어
        <br />
        로그인 페이지에 접근할 수 없습니다
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

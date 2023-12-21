"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RedirectHomeModalProps {
  onClose: () => void
}

function SignupGuard() {
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    openModal({
      containsHeader: false,
      content: <RedirectHomeModal onClose={closeModal} />,
    })
  }, []) /* eslint-disable-line */

  return null
}

export default SignupGuard

function RedirectHomeModal({ onClose }: RedirectHomeModalProps) {
  const { replace } = useRouter()

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        이미 로그인 되어 있어
        <br />
        가입을 진행할 수 없습니다
      </p>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center">
        <Button
          buttonTheme="primary"
          onClick={() => {
            onClose()
            replace("/")
          }}
        >
          홈으로
        </Button>
      </div>
    </div>
  )
}

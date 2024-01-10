"use client"

import { useRouter } from "next/navigation"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"
import { useQueryClient } from "@tanstack/react-query"

function MyPageGuardModal() {
  const queryClient = useQueryClient()
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["user"] })

    openModal({
      containsHeader: false,
      closeableDim: false,
      content: <MyPageGuardModal.ModalContent />,
    })

    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return null
}

MyPageGuardModal.ModalContent = function AskQuestionModalContent() {
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
        마이페이지 접근이 가능합니다
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

export default MyPageGuardModal

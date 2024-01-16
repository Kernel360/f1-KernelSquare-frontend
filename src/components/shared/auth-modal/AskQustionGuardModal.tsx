"use client"

import { useRouter } from "next/navigation"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"

function AskQustionGuardModal() {
  const { replace } = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    /*
      settimeout을 하지 않고 replace할 경우
      pathname은 '/' 이지만,
      route segment가 null(root)로 바뀌지 않고
      'question'인 상태로 남아있으며,
      렌더링이 안됨(빈 페이지)

      정확한 원인은 아직 모르겠음
    */
    setTimeout(() => {
      replace("/?page=0")

      openModal({
        containsHeader: false,
        closeableDim: false,
        content: <AskQustionGuardModal.ModalContent />,
      })
    }, 0)
  }, []) /* eslint-disable-line */

  return null
}

AskQustionGuardModal.ModalContent = function AskQuestionModalContent() {
  const { closeModal } = useModal()

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        로그인 후
        <br />
        질문작성이 가능합니다
      </p>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center">
        <Button buttonTheme="primary" onClick={closeModal}>
          확인
        </Button>
      </div>
    </div>
  )
}

export default AskQustionGuardModal

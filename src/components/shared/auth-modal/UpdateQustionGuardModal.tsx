"use client"

import { useRouter } from "next/navigation"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"
import LoginForm from "@/components/form/LoginForm"
import LabelDivider from "../divider/LabelDivider"

interface UpdateQuestionGuardModalProps {
  guardType: "Unauthorized" | "Forbidden"
  questionId: number
}

function UpdateQuestionGuardModal({
  guardType,
  questionId,
}: UpdateQuestionGuardModalProps) {
  const { replace } = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    replace(`/question/${questionId}`)

    setTimeout(() => {
      openModal({
        containsHeader: true,
        closeableDim: true,
        content: (
          <UpdateQuestionGuardModal.ModalContent
            guardType={guardType}
            questionId={questionId}
          />
        ),
      })
    }, 400)
  }, []) /* eslint-disable-line */

  return null
}

UpdateQuestionGuardModal.ModalContent = function AskQuestionModalContent({
  guardType,
}: UpdateQuestionGuardModalProps) {
  const GuardContent = () => {
    switch (guardType) {
      case "Unauthorized":
        return <UpdateQuestionGuardModal.UnauthorizedContent />
      case "Forbidden":
        return <UpdateQuestionGuardModal.ForbiddenContent />
      default:
        return null
    }
  }

  return (
    <div className="w-full sm:w-[320px]">
      <GuardContent />
    </div>
  )
}

UpdateQuestionGuardModal.UnauthorizedContent =
  function UpdateQustionUnauthorizedContent() {
    const { openModal, closeModal } = useModal()

    const renderLoginModal = () => {
      closeModal()

      setTimeout(() => {
        openModal({
          containsHeader: true,
          closeableDim: true,
          content: <LoginForm />,
        })
      }, 0)
    }

    return (
      <>
        <div className="text-center">
          로그인 후
          <br />
          질문수정이 가능합니다
        </div>
        <LabelDivider label={"로그인 창으로"} />
        <Spacing size={12} />
        <div className="flex w-full justify-center items-center">
          <Button buttonTheme="primary" onClick={renderLoginModal}>
            확인
          </Button>
        </div>
      </>
    )
  }

UpdateQuestionGuardModal.ForbiddenContent =
  function UpdateQustionForbiddenContent() {
    const { closeModal } = useModal()

    return (
      <>
        <div className="text-center">
          질문 작성자만
          <br />
          질문수정이 가능합니다
        </div>
        <Spacing size={12} />
        <div className="flex w-full justify-center items-center">
          <Button buttonTheme="primary" onClick={closeModal}>
            확인
          </Button>
        </div>
      </>
    )
  }

export default UpdateQuestionGuardModal

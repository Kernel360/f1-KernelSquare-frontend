"use client"

import { useRouter } from "next/navigation"
import Button from "../button/Button"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import Spacing from "../Spacing"
import LoginForm from "@/components/form/LoginForm"
import LabelDivider from "../divider/LabelDivider"

interface UpdateCodingMeetingGuardModalProps {
  guardType: "Unauthorized" | "Forbidden"
  coding_meeting_token: string
}

function UpdateCodingMeetingGuardModal({
  guardType,
  coding_meeting_token,
}: UpdateCodingMeetingGuardModalProps) {
  const { replace } = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    replace(`/coding-meetings/${coding_meeting_token}`)

    setTimeout(() => {
      openModal({
        containsHeader: true,
        closeableDim: true,
        content: (
          <UpdateCodingMeetingGuardModal.ModalContent
            guardType={guardType}
            coding_meeting_token={coding_meeting_token}
          />
        ),
      })
    }, 0)
  }, []) /* eslint-disable-line */

  return null
}

UpdateCodingMeetingGuardModal.ModalContent =
  function AskCodingMeetingModalContent({
    guardType,
  }: UpdateCodingMeetingGuardModalProps) {
    const GuardContent = () => {
      switch (guardType) {
        case "Unauthorized":
          return <UpdateCodingMeetingGuardModal.UnauthorizedContent />
        case "Forbidden":
          return <UpdateCodingMeetingGuardModal.ForbiddenContent />
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

UpdateCodingMeetingGuardModal.UnauthorizedContent =
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
          모각코 모집글 수정이 가능합니다
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

UpdateCodingMeetingGuardModal.ForbiddenContent =
  function UpdateQustionForbiddenContent() {
    const { closeModal } = useModal()

    return (
      <>
        <div className="text-center">
          모각코 모집글 작성자만
          <br />
          수정이 가능합니다
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

export default UpdateCodingMeetingGuardModal

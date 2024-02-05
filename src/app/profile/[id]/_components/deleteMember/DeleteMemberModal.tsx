"use client"

import Funnel from "@/components/shared/funnel/Funnel"
import IntroStep from "./steps/IntroStep"
import DeleteMemberModalHeader from "./DeleteMemberModalHeader"
import { useClientSession } from "@/hooks/useClientSession"
import React from "react"
import ReasonFormStep from "./steps/ReasonFormStep"
import ConfirmStep from "./steps/ConfirmStep"
import SubmitStep from "./steps/SubmitStep"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"

export type DeleteMemberFunnelStepNames = Exclude<
  keyof typeof DeleteMemberFunnelStep,
  0 | 1 | 2 | 3
>

export const DeleteMemberFunnelStep = {
  intro: 0,
  reason: 1,
  confirm: 2,
  submit: 3,
  0: "intro",
  1: "reason",
  2: "confirm",
  3: "submit",
}

export function getDeleteMemberFunnelStepNames() {
  return Object.keys(DeleteMemberFunnelStep).filter((key) =>
    Number.isNaN(Number(key)),
  ) as Array<DeleteMemberFunnelStepNames>
}

function DeleteMemberModal() {
  const { user } = useClientSession()

  const { closeModal } = useModal()

  // const [step, setStep] = useState<DeleteMemberFunnelStepNames>("intro")

  const stepNames = getDeleteMemberFunnelStepNames()

  if (!user)
    return (
      <DeleteMemberModal.Wrapper>
        <div className="relative">
          <div className="absolute right-0 top-0 w-fit flex justify-center items-center">
            <DeleteMemberModalHeader.CloseButton onClick={closeModal} />
          </div>
          <div className="flex flex-col w-full h-48 gap-3 justify-center items-center">
            로그인 후 탈퇴를 진행할 수 있습니다
            <Button buttonTheme="primary" onClick={closeModal}>
              확인
            </Button>
          </div>
        </div>
      </DeleteMemberModal.Wrapper>
    )

  return (
    <DeleteMemberModal.Wrapper>
      <Funnel steps={stepNames}>
        <DeleteMemberModalHeader />
        <Funnel.Step stepName={DeleteMemberFunnelStep[0]}>
          {IntroStep}
        </Funnel.Step>
        <Funnel.Step stepName={DeleteMemberFunnelStep[1]}>
          {ReasonFormStep}
        </Funnel.Step>
        <Funnel.Step stepName={DeleteMemberFunnelStep[2]}>
          {ConfirmStep}
        </Funnel.Step>
        <Funnel.Step stepName={DeleteMemberFunnelStep[3]}>
          {SubmitStep}
        </Funnel.Step>
      </Funnel>
    </DeleteMemberModal.Wrapper>
  )
}

export default DeleteMemberModal

DeleteMemberModal.Wrapper = function DeleteMemberModalWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="w-full bg-white">{children}</div>
}

DeleteMemberModal.ContentWrapper = function DeleteMemberModalContentWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="pt-4">{children}</div>
}

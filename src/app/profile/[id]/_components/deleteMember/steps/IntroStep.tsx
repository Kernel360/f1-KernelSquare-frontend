"use client"

import Button from "@/components/shared/button/Button"
import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import DeleteMemberModal from "../DeleteMemberModal"

function IntroStep({ setStep }: FunnelStepFunctionComponentProps) {
  const nextStep = () => {
    setStep("reason")
  }

  return (
    <DeleteMemberModal.ContentWrapper>
      <div className="flex w-full justify-center items-center">
        <Button
          className="border border-colorsGray bg-colorsLightGray hover:bg-colorsGray text-colorsDarkGray hover:text-secondary"
          onClick={nextStep}
        >
          <span className="text-sm font-bold">회원 탈퇴를 하고 싶습니다</span>
        </Button>
      </div>
    </DeleteMemberModal.ContentWrapper>
  )
}

export default IntroStep

/*
<Button
  className="border border-colorsGray bg-colorsLightGray text-danger"
  onClick={nextStep}
>
  다음
</Button>
*/

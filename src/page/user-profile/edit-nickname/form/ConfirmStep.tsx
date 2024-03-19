"use client"

import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import { EditNicknameFormData } from "./EditNicknameForm"
import { Button } from "@/components/ui/button"
import { useClientSession } from "@/hooks/useClientSession"
import EditNicknameCancel from "../EditNicknameCancel"

function ConfirmStep({
  getValues,
  setValue,
  setStep,
}: FunnelStepFunctionComponentProps<EditNicknameFormData>) {
  const { user } = useClientSession()

  const next = () => {
    setStep("Submit")
  }

  const back = () => {
    setValue("nickname", "")
    setValue("nicknameDuplicateCheck", "required")

    setStep("Input")
  }

  return (
    <div>
      <div className="w-fit mx-auto">
        닉네임을 <span className="font-bold">{user?.nickname}</span> 에서{" "}
        <span className="font-bold">{getValues("nickname")}</span> 으로 변경
        하시겠어요?
      </div>
      <div className="mt-4 w-full flex flex-col gap-3 justify-center items-center">
        <div className="flex gap-4 items-center">
          <Button className="w-[116px]" onClick={next}>
            네
          </Button>
          <Button variant={"third"} className="w-[116px]" onClick={back}>
            다시 입력
          </Button>
        </div>
        <EditNicknameCancel />
      </div>
    </div>
  )
}

export default ConfirmStep

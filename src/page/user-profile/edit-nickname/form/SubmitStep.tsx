"use client"

import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import { EditNicknameFormData } from "./EditNicknameForm"
import { useClientSession } from "@/hooks/useClientSession"
import React, { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import { sleep } from "@/util/sleep"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import checkFailWithEmoji from "@/assets/lottie/check-fail-with-emoji.json"
import checkSuccess from "@/assets/lottie/check-success.json"
import Lottie from "lottie-react"
import Spacing from "@/components/shared/Spacing"
import { useRouter } from "next/navigation"

function SubmitStep({
  getValues,
}: FunnelStepFunctionComponentProps<EditNicknameFormData>) {
  const { replace } = useRouter()

  const { user, clientSessionUpdate } = useClientSession()

  // [TODO] 닉네임 변경 api 연동
  const { mutate: editNicknameMutation, status } = useMutation({
    mutationKey: ["editNickname"],
    mutationFn: async (nickname: string) => {
      await sleep(4000)

      return "edit"
    },
    async onSuccess(data, nickname) {
      clientSessionUpdate({
        image_url: user?.image_url,
        nickname,
      })

      setTimeout(() => {
        replace(`/profile/${user?.member_id}`)
      }, 1500)
    },
  })

  useEffect(() => {
    editNicknameMutation(getValues("nickname"))
  }, []) /* eslint-disable-line */

  if (status === "idle") {
    return <></>
  }

  if (status === "pending") {
    return (
      <Wrapper>
        <ContentLoading style={{ width: "120px" }} />
        <Spacing size={16} />
        <div>닉네임 수정을 진행 중입니다</div>
      </Wrapper>
    )
  }

  if (status === "error") {
    return (
      <Wrapper>
        <Lottie className="w-28" animationData={checkFailWithEmoji} />
        <Spacing size={16} />
        <div>에러가 발생했습니다</div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Lottie className="w-28" animationData={checkSuccess} loop={false} />
      <Spacing size={16} />
      <div>닉네임 수정을 성공했습니다</div>
    </Wrapper>
  )
}

export default SubmitStep

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-col items-center">{children}</div>
}

"use client"

import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import { EditNicknameFormData } from "./EditNicknameForm"
import { useClientSession } from "@/hooks/useClientSession"
import React, { useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import checkFailWithEmoji from "@/assets/lottie/check-fail-with-emoji.json"
import checkSuccess from "@/assets/lottie/check-success.json"
import Lottie from "lottie-react"
import Spacing from "@/components/shared/Spacing"
import { useRouter } from "next/navigation"
import { updateMemberNickname } from "@/service/member"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { revalidatePage } from "@/util/actions/revalidatePage"

function SubmitStep({
  getValues,
  setValue,
  setStep,
}: FunnelStepFunctionComponentProps<EditNicknameFormData>) {
  const { replace } = useRouter()

  const { user, clientSessionUpdate } = useClientSession()

  const queryClient = useQueryClient()

  const {
    mutate: editNicknameMutation,
    status,
    error,
  } = useMutation({
    mutationKey: ["editNickname"],
    mutationFn: (nickname: string) =>
      updateMemberNickname({ member_id: user!.member_id, nickname }),
    async onSuccess(data, nickname) {
      clientSessionUpdate({
        image_url: user?.image_url,
        nickname,
      })

      setTimeout(() => {
        replace(`/profile/${user?.member_id}`)
      }, 1500)
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        toast.error(response?.data.msg ?? "닉네임 수정을 실패했습니다", {
          position: "bottom-center",
          toastId: "nicknameApiError",
        })

        return
      }

      toast.error("닉네임 수정을 실패했습니다", {
        position: "bottom-center",
        toastId: "nicknameError",
      })
    },
  })

  useEffect(() => {
    editNicknameMutation(getValues("nickname"))
  }, []) /* eslint-disable-line */

  const ErrorButtonGroup = () => {
    return (
      <div className="w-full flex justify-center">
        <Button
          variant={"secondary"}
          onClick={async () => {
            const mutationCache = queryClient.getMutationCache()

            const cache = mutationCache.find({ mutationKey: ["editNickname"] })

            if (cache) {
              mutationCache.remove(cache)
            }

            setValue("nickname", "")
            setValue("nicknameDuplicateCheck", "required")

            await revalidatePage("*")

            setStep("Input")
          }}
        >
          처음부터
        </Button>
      </div>
    )
  }

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
        <Spacing size={16} />
        <div className="break-all p-2 w-[320px] max-w-full mx-auto bg-colorsLightGray text-secondary font-medium rounded-md">
          {getErrorMessage(error)}
        </div>
        <div className="mt-4">
          <ErrorButtonGroup />
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Lottie className="w-28" animationData={checkSuccess} loop={false} />
      <Spacing size={16} />
      <div>닉네임 수정을 성공했습니다</div>
      <Spacing size={16} />
      <div className="break-all p-2 w-[320px] max-w-full mx-auto bg-colorsLightGray text-secondary font-medium rounded-md">
        마이페이지로 이동합니다
      </div>
    </Wrapper>
  )
}

export default SubmitStep

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-col items-center">{children}</div>
}

function getErrorMessage(error: any) {
  const fallbackMessage = "닉네임 수정을 실패했습니다"

  if (error instanceof AxiosError) {
    const { response } = error as AxiosError<APIResponse>

    return response?.data.msg ?? fallbackMessage
  }

  return fallbackMessage
}

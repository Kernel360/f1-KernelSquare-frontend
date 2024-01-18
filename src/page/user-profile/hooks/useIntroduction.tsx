import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { Introduction, TextLen } from "@/recoil/atoms/member"
import { IntroductionEditMode } from "@/recoil/atoms/mode"
import { updateMemberInfo } from "@/service/member"
import type { FormEvent } from "react"
import { SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import { IntroductionValue } from "./useIntroduction.types"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"

const useIntroduction = () => {
  /**
   * 자기소개 수정 관련
   */
  const [isEditMode, setIsEditMode] = useRecoilState(IntroductionEditMode)
  const closeEditMode = () => setIsEditMode(false)

  const handleEditMode = () => setIsEditMode((prev: boolean) => !prev)
  const { user, clientSessionUpdate } = useClientSession()
  const queryClient = useQueryClient()

  const handleSubmitIntroduction: SubmitHandler<IntroductionValue> = async (
    data,
  ) => {
    if (data.intro.length > 300) {
      toast.error(errorMessage.introductionLimit, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    if (!user) {
      toast.error(errorMessage.unauthorized, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      await updateMemberInfo({
        id: user?.member_id,
        introduction: data.intro,
      })
      toast.success(successMessage.editIntroduction, {
        position: "top-center",
        autoClose: 1000,
      })
      clientSessionUpdate({
        introduction: data.intro,
      })
      queryClient.invalidateQueries({
        queryKey: [queryKey.user, queryKey.profile, user.member_id],
      })
    } catch (err) {
      throw new Error("자기소개 업데이트 중 에러가 발생하였습니다.")
    }
    closeEditMode()
  }

  const handleCancleEdit = () =>
    toast.error(notificationMessage.cancleEditIntroduction, {
      position: "top-center",
    })

  return {
    isEditMode,
    setIsEditMode,
    closeEditMode,
    handleEditMode,
    handleSubmitIntroduction,
    handleCancleEdit,
  }
}

export default useIntroduction

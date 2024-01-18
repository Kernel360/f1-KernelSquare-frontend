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
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"

const useIntroduction = () => {
  /**
   * 자기소개 수정 관련
   */
  const [isEditMode, setIsEditMode] = useRecoilState(IntroductionEditMode)
  const closeEditMode = () => {
    setIsEditMode(false)
    handleCancleEdit()
  }
  const handleEditMode = () => setIsEditMode((prev: boolean) => !prev)
  const { clientSessionUpdate } = useClientSession()

  const [introduction, setIntroduction] = useRecoilState(Introduction)
  const [textLen, setTextLen] = useRecoilState(TextLen)

  const handleChange = (textValue: string) => {
    setIntroduction(textValue)
    setTextLen(textValue.length)
  }

  const handleSubmitIntroduction = async (
    e: FormEvent<HTMLFormElement>,
    memberId: number,
  ) => {
    e.preventDefault()
    if (introduction.length > 300) {
      toast.error(errorMessage.introductionLimit, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      await updateMemberInfo({
        id: memberId,
        introduction,
      })
      toast.success(successMessage.editIntroduction, {
        position: "top-center",
        autoClose: 1000,
      })
      clientSessionUpdate({
        introduction,
      })
    } catch (err) {
      console.error("error", err)
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
    introduction,
    setIntroduction,
    textLen,
    setTextLen,
    handleChange,
    handleSubmitIntroduction,
    handleCancleEdit,
  }
}

export default useIntroduction

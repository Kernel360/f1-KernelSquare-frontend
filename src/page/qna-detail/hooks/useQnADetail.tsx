"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { useProgressModal } from "@/hooks/useProgressModal"
import type { Answer } from "@/interfaces/answer"
import { useState } from "react"

const useQnADetail = () => {
  const { ProgressModalView, setStep } = useProgressModal()
  const { user } = useClientSession()

  const checkNullValue = (submitValue: string | undefined) => {
    if (typeof submitValue === undefined) return true
    if (typeof submitValue === "string" && /^\s*$/.test(submitValue))
      return true
    return false
  }

  const [isChecked, setIsChecked] = useState(false)

  const filterMyAnswer = (answerArr: Answer[]) => {
    if (isChecked)
      return answerArr.filter((answer) => answer.created_by === user?.nickname)
    return answerArr
  }

  return {
    user,
    checkNullValue,
    ProgressModalView,
    setModalStart: () => setStep("start"),
    setModalSuccess: () => setStep("success"),
    setModalFail: () => setStep("fail"),
    filterMyAnswer,
    handleIsChecked: () => setIsChecked((prev: boolean) => !prev),
  }
}

export default useQnADetail

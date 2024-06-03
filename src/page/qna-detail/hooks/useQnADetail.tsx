"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { useProgressModal } from "@/hooks/useProgressModal"
import { useState } from "react"
import type { Answer } from "@/interfaces/answer"

const useQnADetail = () => {
  const { ProgressModalView, setStep } = useProgressModal()
  const { user } = useClientSession()

  const [isChecked, setIsChecked] = useState(false)

  /**
   * 내 답변 보기 checkbox 선택 시
   */
  const filterMyAnswer = (answerArr: Answer[]) => {
    if (isChecked)
      return answerArr.filter(
        (answer) => answer.member_nickname === user?.nickname,
      )
    return answerArr
  }

  return {
    user,
    ProgressModalView,
    setStep,
    filterMyAnswer,
    isChecked,
    setChecked: (checked: boolean) => setIsChecked(checked),
  }
}

export default useQnADetail

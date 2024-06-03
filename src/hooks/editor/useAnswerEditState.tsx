"use client"

import { AnswerEditStateAtom } from "@/recoil/atoms/editor/mode"
import { useRecoilState, useResetRecoilState } from "recoil"

export function useAnswerEditState() {
  const [answerEditState, setAnswerEditMode] =
    useRecoilState(AnswerEditStateAtom)

  const resetAnswerEditStateAtom = useResetRecoilState(AnswerEditStateAtom)

  const answerIsEditMode = (answerId: number) => {
    return answerEditState.editTargetAnswerId === answerId
  }

  const answerSetToEditMode = (answerId: number) => {
    setAnswerEditMode((prev) => ({
      ...prev,
      editTargetAnswerId: answerId,
    }))
  }

  const answerSetToViewMode = () => {
    resetAnswerEditStateAtom()
  }

  return {
    answerIsEditMode,
    answerSetToEditMode,
    answerSetToViewMode,
  }
}

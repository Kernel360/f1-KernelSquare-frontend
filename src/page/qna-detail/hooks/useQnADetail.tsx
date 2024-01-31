"use client"

import { errorMessage, successMessage } from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { useProgressModal } from "@/hooks/useProgressModal"
import type { Answer } from "@/interfaces/answer"
import { useState } from "react"
import { toast } from "react-toastify"
import SuccessModalContent from "../components/SuccessModalContent"
import queryKey from "@/constants/queryKey"
import { sleep } from "@/util/sleep"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import { AnswerWriteMode } from "@/recoil/atoms/mode"
import { answerQueries } from "@/react-query/answers"

export interface SubmitValueProps {
  questionId: number
  submitValue: string | undefined
}

type useQnADetailProps = { questionId: number }

const useQnADetail = ({ questionId }: useQnADetailProps) => {
  const { ProgressModalView, setStep } = useProgressModal()
  const { user } = useClientSession()
  const { openModal } = useModal()
  const queryClient = useQueryClient()
  const [isAnswerMode, setIsAnswerMode] = useRecoilState(
    AnswerWriteMode(questionId),
  )
  const { createAnswer } = answerQueries.useCreateAnswer()

  const checkNullValue = (submitValue: string | undefined) => {
    if (typeof submitValue === undefined) return true
    if (typeof submitValue === "string" && /^\s*$/.test(submitValue))
      return true
    return false
  }

  const [isChecked, setIsChecked] = useState(false)

  /**
   * 내 답변 보기 checkbox 선택 시
   */
  const filterMyAnswer = (answerArr: Answer[]) => {
    if (isChecked)
      return answerArr.filter((answer) => answer.created_by === user?.nickname)
    return answerArr
  }

  /**
   * 본인이 쓴 답변이 존재하면 editor 보이지 않게 하기
   */
  const handleCheckMyAnswer = (list: Answer[], nickname?: string) =>
    list?.some((answer) => answer.created_by === nickname)

  const handleSubmitValue = async ({
    questionId,
    submitValue,
  }: SubmitValueProps) => {
    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      if (user?.member_id) {
        createAnswer(
          {
            questionId,
            member_id: user.member_id,
            content: submitValue || "",
          },
          {
            onSuccess: () => {
              openModal({
                content: (
                  <SuccessModalContent message={successMessage.createAnswer} />
                ),
                onClose() {
                  queryClient.invalidateQueries({
                    queryKey: [queryKey.answer, questionId],
                  })
                  setIsAnswerMode(false)
                },
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.answer, questionId],
              })
              setIsAnswerMode(false)
            },
          },
        )
      }
    } catch (err) {
      console.error("error", err)
    }
    setIsAnswerMode(false)
  }

  return {
    user,
    isAnswerMode,
    setIsAnswerMode,
    checkNullValue,
    ProgressModalView,
    setModalStart: () => setStep("start"),
    setModalSuccess: () => setStep("success"),
    setModalFail: () => setStep("fail"),
    filterMyAnswer,
    handleIsChecked: () => setIsChecked((prev: boolean) => !prev),
    handleSubmitValue,
    isChecked,
    handleCheckMyAnswer,
  }
}

export default useQnADetail

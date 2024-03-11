"use client"

import { errorMessage, successMessage } from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { useProgressModal } from "@/hooks/useProgressModal"
import type { Answer } from "@/interfaces/answer"
import { useState } from "react"
import { toast } from "react-toastify"
import SuccessModalContent from "../components/SuccessModalContent"
import queryKey from "@/constants/queryKey"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { answerQueries } from "@/react-query/answers"

export interface SubmitValueProps {
  questionId: number
  submitValue: string | undefined
}

const useQnADetail = () => {
  const { ProgressModalView, setStep } = useProgressModal()
  const { user } = useClientSession()
  const { openModal } = useModal()
  const queryClient = useQueryClient()

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
  const handleCheckAbilityToWriteAnswer = (
    list?: Answer[],
    nickname?: string,
  ) => {
    // 질문, 사용자 관련 데이터가 없을 경우
    if (!list) return false
    if (!nickname) return false
    // 답변 중에 이미 내가 작성한 답변이 있을 경우
    if (list?.some((answer) => answer.created_by === user?.nickname))
      return false
    // 본인 질문글일 경우
    if (nickname === user?.nickname) return false
    return true
  }

  const handleSubmitValue = async ({
    questionId,
    submitValue,
  }: SubmitValueProps) => {
    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        toastId: "emptyAnswerContent",
        position: "top-center",
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
                  queryClient.invalidateQueries({
                    queryKey: [queryKey.question, questionId],
                  })
                },
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.answer, questionId],
              })
              queryClient.invalidateQueries({
                queryKey: [queryKey.question, questionId],
              })
            },
          },
        )
      }
    } catch (err) {
      console.error("error", err)
    }
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
    handleSubmitValue,
    isChecked,
    handleCheckAbilityToWriteAnswer,
  }
}

export default useQnADetail

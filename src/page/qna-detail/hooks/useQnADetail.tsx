"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { useProgressModal } from "@/hooks/useProgressModal"
import type { Answer } from "@/interfaces/answer"
import { useState } from "react"
import SuccessModalContent from "../components/SuccessModalContent"
import queryKey from "@/constants/queryKey"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { answerQueries } from "@/react-query/answers"
import successMessage from "@/constants/message/success"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"

export interface CreateAnswerSubmitProps {
  questionId: number
  answer: string
  image_url?: string
  onError?:
    | ((
        errorCase: "unauthorized" | "apiError" | "error",
        error: Error | AxiosError,
      ) => void)
    | ((
        errorCase: "unauthorized" | "apiError" | "error",
        error: Error | AxiosError,
      ) => Promise<void>)
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
      return answerArr.filter(
        (answer) => answer.member_nickname === user?.nickname,
      )
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
    if (list?.some((answer) => answer.member_nickname === user?.nickname))
      return false
    // 본인 질문글일 경우
    if (nickname === user?.nickname) return false
    return true
  }

  const createAnswerSubmit = ({
    questionId,
    answer,
    image_url,
    onError,
  }: CreateAnswerSubmitProps) => {
    try {
      if (!user?.member_id) {
        onError && onError("unauthorized", new Error("user id is empty"))
        return
      }

      const invalidateQueries = () => {
        queryClient.invalidateQueries({
          queryKey: [queryKey.answer, questionId],
        })
        queryClient.invalidateQueries({
          queryKey: [queryKey.question, questionId],
        })
      }

      createAnswer(
        {
          questionId,
          member_id: user.member_id,
          content: answer,
          ...(image_url && { image_url }),
        },
        {
          onSuccess: () => {
            openModal({
              content: (
                <SuccessModalContent message={successMessage.createAnswer} />
              ),
              onClose() {
                invalidateQueries()
              },
            })

            invalidateQueries()
          },
          onError(error) {
            if (error instanceof AxiosError) {
              const { response } = error as AxiosError<APIResponse>

              if (response?.status === HttpStatusCode.Unauthorized) {
                onError && onError("unauthorized", error)
                return
              }

              onError && onError("apiError", error)
              return
            }

            onError && onError("error", error)
          },
        },
      )
    } catch (error) {
      onError && onError("error", error as Error)
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
    createAnswerSubmit,
    isChecked,
    handleCheckAbilityToWriteAnswer,
  }
}

export default useQnADetail

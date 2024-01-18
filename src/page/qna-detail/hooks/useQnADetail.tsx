"use client"

import { errorMessage, successMessage } from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { useProgressModal } from "@/hooks/useProgressModal"
import type { Answer } from "@/interfaces/answer"
import { createAnswer } from "@/service/answers"
import { useState } from "react"
import { toast } from "react-toastify"
import SuccessModalContent from "../components/SuccessModalContent"
import queryKey from "@/constants/queryKey"
import { sleep } from "@/util/sleep"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import type { SubmitValueProps } from "./useQnADetail.types"
import { useRecoilState } from "recoil"
import { AnswerWriteMode } from "@/recoil/atoms/mode"

const useQnADetail = () => {
  const { ProgressModalView, setStep } = useProgressModal()
  const { user } = useClientSession()
  const { openModal } = useModal()
  const queryClient = useQueryClient()
  const [isAnswerMode, setIsAnswerMode] = useRecoilState(AnswerWriteMode)

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
        const res = await createAnswer({
          questionId,
          member_id: user.member_id,
          content: submitValue || "",
        })
        console.log("res", res.data.msg, res.config.data)
        openModal({
          content: (
            <SuccessModalContent message={successMessage.createAnswer} />
          ),
          onClose() {
            queryClient.invalidateQueries({
              queryKey: [queryKey.answer, questionId],
            })
          },
        })
        sleep(5000).then(() => {
          queryClient.invalidateQueries({
            queryKey: [queryKey.answer, questionId],
          })
        })
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
    handleCheckMyAnswer,
  }
}

export default useQnADetail

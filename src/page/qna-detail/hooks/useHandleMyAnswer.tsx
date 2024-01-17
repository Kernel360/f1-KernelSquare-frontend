"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import useModal from "@/hooks/useModal"
import { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"
import { deleteAnswer, updateAnswer } from "@/service/answers"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import useQnADetail from "./useQnADetail"
import { useRecoilState } from "recoil"
import { AnswerMode } from "@/recoil/atoms/mode"
import queryKey from "@/constants/queryKey"

interface EditValueProps {
  submitValue: string | undefined
  answer: Answer
}

interface DeleteValueProps {
  answer: Answer
  successModal: NonNullable<ModalState["content"]>
}

interface AnswerProps {
  answerId: number
}

const useHandleMyAnswer = ({ answerId }: AnswerProps) => {
  const [isAnswerEditMode, setIsAnswerEditMode] = useRecoilState(
    AnswerMode(answerId),
  )
  const queryClient = useQueryClient()
  const { openModal } = useModal()
  const { checkNullValue } = useQnADetail()

  const handleEditValue = async ({ submitValue, answer }: EditValueProps) => {
    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      const res = await updateAnswer({
        answerId: answer.answer_id,
        content: submitValue as string,
      })
      answer.content = JSON.parse(res.config.data).content
      answer.answer_image_url = JSON.parse(res.config.data).answer_image_url
      queryClient.invalidateQueries({
        queryKey: [queryKey.answer, answer.answer_id],
      })
      toast.success(successMessage.updateAnswer, { position: "top-center" })
      setIsAnswerEditMode(false)
    } catch (err) {
      toast.error(errorMessage.updateAnswer, { position: "top-center" })
    }
  }

  const handleDeleteValue = async ({
    answer,
    successModal,
  }: DeleteValueProps) => {
    const onSuccess = async () => {
      try {
        const res = await deleteAnswer({
          answerId: answer.answer_id,
        })

        console.log("success", res.data.msg)
        openModal({
          content: successModal,
          onClose() {
            queryClient.invalidateQueries({
              queryKey: ["answer", answer.question_id],
            })
          },
        })
        sleep(5000).then(() => {
          queryClient.invalidateQueries({
            queryKey: ["answer", answer.question_id],
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
    const onCancel = () => {
      toast.error(notificationMessage.cancleDeleteAnswer, {
        position: "top-center",
      })
    }
    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onSuccess}
          onCancel={onCancel}
          situation="deleteContent"
        />
      ),
    })
  }

  return {
    isAnswerEditMode,
    setIsAnswerEditMode,
    handleEditMode: () => setIsAnswerEditMode((prev: boolean) => !prev),
    handleEditValue,
    handleDeleteValue,
  }
}

export default useHandleMyAnswer

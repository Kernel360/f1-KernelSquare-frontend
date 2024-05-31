"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { errorMessage } from "@/constants/message/error"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useRecoilState, useResetRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import queryKey from "@/constants/queryKey"
import { answerQueries } from "@/react-query/answers"
import type { Answer } from "@/interfaces/answer"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"
import successMessage from "@/constants/message/success"
import { useDeleteAnswer } from "./answer/useDeleteAnswer"
import SuccessModalContent from "../components/SuccessModalContent"
import { answerEditorAtomFamily } from "@/recoil/atoms/answerEditor"

export interface EditValueProps {
  submitValue: string | undefined
  answer: Answer
}

export interface AnswerProps {
  answerId: number
  questionId: number
}

const useHandleMyAnswer = ({ answerId, questionId }: AnswerProps) => {
  const queryClient = useQueryClient()

  const { openModal } = useModal()

  const [isAnswerEditMode, setIsAnswerEditMode] = useRecoilState(
    AnswerEditMode(answerId),
  )
  const resetAnswerEditorAtom = useResetRecoilState(
    answerEditorAtomFamily(answerId),
  )

  const { updateAnswer } = answerQueries.useUpdateAnswer({ answerId })
  const { deleteAnswerApi, deleteAnswerApiStatus } = useDeleteAnswer({
    answerId,
    questionId,
    onSuccess(data, variables, context) {
      resetAnswerEditorAtom()

      setTimeout(() => {
        openModal({
          content: (
            <SuccessModalContent message={successMessage.deleteAnswer} />
          ),
        })
      }, 400)
    },
  })

  const handleEditValue = ({ submitValue, answer }: EditValueProps) => {
    const imageUrl = findImageLinkUrlFromMarkdown(submitValue)

    updateAnswer(
      {
        answerId: answer.answer_id,
        content: submitValue as string,
        image_url: imageUrl && imageUrl[0],
      },
      {
        onSuccess: () => {
          toast.success(successMessage.updateAnswer, {
            toastId: "successToUpdateAnswer",
            position: "top-center",
          })
          setIsAnswerEditMode(false)
          return queryClient.invalidateQueries({
            queryKey: [queryKey.answer],
          })
        },
        onError: () =>
          toast.error(errorMessage.updateAnswer, {
            toastId: "failToUpdateAnswer",
            position: "top-center",
          }),
      },
    )
  }

  const deleteAnswer = () => {
    const onSuccess = async () => {
      if (deleteAnswerApiStatus === "pending") return

      deleteAnswerApi()
    }
    const onCancel = () => {}
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
    handleEditValue,
    deleteAnswer,
  }
}

export default useHandleMyAnswer

"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import {
  errorMessage,
  notificationMessage,
  successMessage,
} from "@/constants/message"
import useModal from "@/hooks/useModal"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import useQnADetail from "./useQnADetail"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import queryKey from "@/constants/queryKey"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import Regex from "@/constants/regex"
import { answerQueries } from "@/react-query/answers"
import type { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"

export interface EditValueProps {
  submitValue: string | undefined
  answer: Answer
}

export interface DeleteValueProps {
  answer: Answer
  successModal: NonNullable<ModalState["content"]>
}

export interface AnswerProps {
  answerId: number
  questionId: number
}

const useHandleMyAnswer = ({ answerId, questionId }: AnswerProps) => {
  const [isAnswerEditMode, setIsAnswerEditMode] = useRecoilState(
    AnswerEditMode(answerId),
  )
  const queryClient = useQueryClient()
  const { openModal } = useModal()
  const { checkNullValue, setIsAnswerMode } = useQnADetail({ questionId })
  const { deleteImage } = useDeleteImage()
  const { updateAnswer } = answerQueries.useUpdateAnswer()
  const { deleteAnswer } = answerQueries.useDeleteAnswer()

  const handleEditValue = ({ submitValue, answer }: EditValueProps) => {
    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
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
            position: "top-center",
          })
          setIsAnswerEditMode(false)
          return queryClient.invalidateQueries({
            queryKey: [queryKey.answer],
          })
        },
        onError: () =>
          toast.error(errorMessage.updateAnswer, { position: "top-center" }),
      },
    )
  }

  const handleDeleteValue = async ({
    answer,
    successModal,
  }: DeleteValueProps) => {
    const onSuccess = async () => {
      try {
        deleteAnswer(
          {
            answerId: answer.answer_id,
          },
          {
            onSuccess: () => {
              toast.success(successMessage.deleteAnswer, {
                position: "top-center",
              })

              queryClient.invalidateQueries({
                queryKey: [queryKey.answer],
              })
              setIsAnswerMode(true)

              if (answer.answer_image_url) deleteImage(answer.answer_image_url)
            },
          },
        )
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

  const handleEditMode = () => setIsAnswerEditMode((prev: boolean) => !prev)

  return {
    isAnswerEditMode,
    setIsAnswerEditMode,
    handleEditMode,
    handleEditValue,
    handleDeleteValue,
  }
}

export default useHandleMyAnswer

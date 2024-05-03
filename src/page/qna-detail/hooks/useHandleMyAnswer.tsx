"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { errorMessage } from "@/constants/message/error"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import useQnADetail from "./useQnADetail"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import queryKey from "@/constants/queryKey"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import { answerQueries } from "@/react-query/answers"
import type { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"
import cancleMessage from "@/constants/message/cancle"
import successMessage from "@/constants/message/success"
import { validationMessage } from "@/constants/message/validation"
import { AxiosError } from "axios"
import { DeleteAnswerRequest } from "@/interfaces/dto/answer/delete-answer.dto"

export interface EditValueProps {
  submitValue: string | undefined
  answer: Answer
}

export interface DeleteValueProps {
  answer: Answer
  onDeleteSuccess?: () => void
  onDeleteError?: (
    error: Error | AxiosError,
    variables: DeleteAnswerRequest,
    context: unknown,
  ) => void
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
  const { checkNullValue } = useQnADetail()
  const { deleteImage } = useDeleteImage()
  const { updateAnswer } = answerQueries.useUpdateAnswer({ answerId })
  const { deleteAnswer } = answerQueries.useDeleteAnswer()

  const handleEditValue = ({ submitValue, answer }: EditValueProps) => {
    if (checkNullValue(submitValue)) {
      toast.error(validationMessage.noContent, {
        toastId: "emptyAnswerContent",
        position: "top-center",
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

  const handleDeleteValue = async ({
    answer,
    onDeleteSuccess,
    onDeleteError,
  }: DeleteValueProps) => {
    const onSuccess = async () => {
      deleteAnswer(
        {
          answerId: answer.answer_id,
        },
        {
          onSuccess: () => {
            toast.success(successMessage.deleteAnswer, {
              toastId: "successToDeleteAnswer",
              position: "top-center",
            })

            queryClient.invalidateQueries({
              queryKey: [queryKey.answer],
            })
            queryClient.invalidateQueries({
              queryKey: [queryKey.question, questionId],
            })

            if (answer.answer_image_url) {
              try {
                deleteImage(answer.answer_image_url)
              } catch (error) {}
            }

            setTimeout(() => {
              onDeleteSuccess && onDeleteSuccess()
            }, 0)
          },
          onError(error, variables, context) {
            onDeleteError && onDeleteError(error, variables, context)
          },
        },
      )
    }
    const onCancel = () => {
      toast.error(cancleMessage.deleteAnswer, {
        toastId: "cancleDeleteAnswer",
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

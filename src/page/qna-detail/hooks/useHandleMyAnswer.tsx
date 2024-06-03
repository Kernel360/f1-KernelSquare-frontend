"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { QUESTION_QUERY_KEY } from "@/constants/queryKey"
import successMessage from "@/constants/message/success"
import { useDeleteAnswer } from "./answer/useDeleteAnswer"
import SuccessModalContent from "../components/SuccessModalContent"
import { useAnswerEditState } from "@/hooks/editor/useAnswerEditState"
import {
  UpdateAnswerCallback,
  UpdateAnswerVariables,
  useUpdateAnswer,
} from "./answer/useUpdateAnswer"

export interface UseHandleMyAnswer {
  answerId: number
  questionId: number
  updateAnswerCallback?: UpdateAnswerCallback
}

const useHandleMyAnswer = ({
  answerId,
  questionId,
  updateAnswerCallback,
}: UseHandleMyAnswer) => {
  const queryClient = useQueryClient()

  const { openModal } = useModal()

  const { answerIsEditMode, answerSetToEditMode, answerSetToViewMode } =
    useAnswerEditState()

  // update
  const { updateAnswerApi, updateAnswerApiStatus } = useUpdateAnswer({
    answerId,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: QUESTION_QUERY_KEY.questionAnswers(questionId),
      })

      setTimeout(() => {
        updateAnswerCallback?.onSuccess &&
          updateAnswerCallback.onSuccess(data, variables, context)
      }, 0)
    },
    onError: updateAnswerCallback?.onError,
  })

  const updateAnswer = ({ content, image_url }: UpdateAnswerVariables) => {
    if (updateAnswerApiStatus === "pending") return

    updateAnswerApi({ content, image_url })
  }

  // delete
  const { deleteAnswerApi, deleteAnswerApiStatus } = useDeleteAnswer({
    answerId,
    questionId,
    onSuccess(data, variables, context) {
      setTimeout(() => {
        openModal({
          content: (
            <SuccessModalContent message={successMessage.deleteAnswer} />
          ),
        })
      }, 400)
    },
  })

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
    answerIsEditMode: answerIsEditMode(answerId),
    answerSetToEditMode: () => answerSetToEditMode(answerId),
    answerSetToViewMode,
    updateAnswer,
    deleteAnswer,
  }
}

export default useHandleMyAnswer

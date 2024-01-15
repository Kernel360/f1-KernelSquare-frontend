import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { errorMessage, notificationMessage } from "@/constants/message"
import useModal from "@/hooks/useModal"
import { Answer } from "@/interfaces/answer"
import type { ModalState } from "@/interfaces/modal"
import { deleteAnswer, updateAnswer } from "@/service/answers"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"
import useQnADetail from "./useQnADetail"

interface EditValueProps {
  submitValue: string | undefined
  answer: Answer
}

interface DeleteValueProps {
  answer: Answer
  successModal: NonNullable<ModalState["content"]>
}

const useHandleMyAnswer = () => {
  const [isAnswerEditMode, setIsAnswerEditMode] = useState(false)
  const queryClient = useQueryClient()
  const { openModal } = useModal()
  const { checkNullValue } = useQnADetail()

  const handleEditValue = async ({ submitValue, answer }: EditValueProps) => {
    console.log("md", submitValue)

    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      await updateAnswer({
        answerId: answer.answer_id,
        content: submitValue as string,
      })

      queryClient.invalidateQueries({
        queryKey: ["answer", answer.question_id],
      })
    } catch (err) {
      console.error("error", err)
    }
    setIsAnswerEditMode(false)
  }

  const handleDeleteValue = async ({
    answer,
    successModal,
  }: DeleteValueProps) => {
    const onSuccess = async () => {
      try {
        deleteAnswer({
          answerId: answer.answer_id,
        }).then((res) => {
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

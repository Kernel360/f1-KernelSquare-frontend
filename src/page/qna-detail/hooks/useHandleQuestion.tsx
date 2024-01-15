"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { notificationMessage } from "@/constants/message"
import queryKey from "@/constants/queryKey"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import type { ModalState } from "@/interfaces/modal"
import type { Question } from "@/interfaces/question"
import { deleteQuestion } from "@/service/question"
import { sleep } from "@/util/sleep"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface QuestionProps {
  questionId: number
}

interface DeleteQuestionProps {
  question: Question
  successModal: NonNullable<ModalState["content"]>
}

const useHandleQuestion = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const queryClient = useQueryClient()

  const handleEditQuestion = ({ questionId }: QuestionProps) =>
    router.push(`/question/u/${questionId}`)

  const handleDeleteQuestion = async ({
    question,
    successModal,
  }: DeleteQuestionProps) => {
    const onSuccess = async () => {
      try {
        deleteQuestion({
          questionId: question.id,
        }).then((res) => {
          console.log("success", res.data.msg)
          openModal({
            content: successModal,
            onClose() {
              queryClient.invalidateQueries({
                queryKey: [queryKey.question, question.id],
              })
            },
          })
          sleep(5000).then(() => {
            queryClient.invalidateQueries({
              queryKey: [queryKey.question],
            })
            router.replace("/")
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
    const onCancel = () => {
      toast.error(notificationMessage.cancleDeleteQuestion, {
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

  return { handleEditQuestion, handleDeleteQuestion }
}

export default useHandleQuestion

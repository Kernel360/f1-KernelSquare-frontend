"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import queryKey from "@/constants/queryKey"
import useModal from "@/hooks/useModal"
import { deleteQuestion } from "@/service/question"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import type { ModalState } from "@/interfaces/modal"
import type { Question } from "@/interfaces/question"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"
import cancleMessage from "@/constants/message/cancle"

export interface QuestionProps {
  questionId: number
}

export interface DeleteQuestionProps {
  question: Question
  successModal: NonNullable<ModalState["content"]>
}

const useHandleQuestion = () => {
  const router = useRouter()
  const { openModal } = useModal()
  const queryClient = useQueryClient()
  const { deleteImage } = useDeleteImage()

  const handleEditQuestion = ({ questionId }: QuestionProps) =>
    router.push(`/question/u/${questionId}`)

  const handleDeleteQuestion = async ({
    question,
    successModal,
  }: DeleteQuestionProps) => {
    const onSuccess = async () => {
      try {
        const imageUrl = findImageLinkUrlFromMarkdown(question.content)

        deleteQuestion({
          questionId: question.id,
        })
        openModal({
          content: successModal,
          onClose() {
            queryClient.invalidateQueries({
              queryKey: [queryKey.question, question.id],
            })
          },
        })
        if (imageUrl) deleteImage(imageUrl[0])
        queryClient.invalidateQueries({
          queryKey: [queryKey.question],
        })
        router.replace("/qna")
      } catch (err) {
        console.error(err)
      }
    }
    const onCancel = () => {
      toast.error(cancleMessage.deleteQuestion, {
        toastId: "cancleDeleteQuestion",
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

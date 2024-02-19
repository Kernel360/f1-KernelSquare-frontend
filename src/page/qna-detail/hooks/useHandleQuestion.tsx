"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import { notificationMessage } from "@/constants/message"
import queryKey from "@/constants/queryKey"
import useModal from "@/hooks/useModal"
import { deleteQuestion } from "@/service/question"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Regex from "@/constants/regex"
import { useDeleteImage } from "@/hooks/image/useDeleteImage"
import type { ModalState } from "@/interfaces/modal"
import type { Question } from "@/interfaces/question"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"

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

        const res = await deleteQuestion({
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
        if (imageUrl)
          for (let image of imageUrl) {
            const url = image.split("(")[1].split(")")[0]
            deleteImage(url)
          }
        queryClient.invalidateQueries({
          queryKey: [queryKey.question],
        })
        router.replace("/")
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

"use client"

import ConfirmModal from "@/components/shared/confirm-modal/ConfirmModal"
import queryKey from "@/constants/queryKey"
import useModal from "@/hooks/useModal"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useDeleteQuestion } from "./question/useDeleteQuestion"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { useClientSession } from "@/hooks/useClientSession"
import cancelMessage from "@/constants/message/cancel"
import SuccessModalContent from "../components/SuccessModalContent"
import successMessage from "@/constants/message/success"

interface UseHandleQuestion {
  questionId: number
}

const useHandleQuestion = ({ questionId }: UseHandleQuestion) => {
  const queryClient = useQueryClient()
  const { clientSessionReset } = useClientSession()
  const { push, replace } = useRouter()

  const { openModal } = useModal()

  const { deleteQuestionApi, deleteQuestionApiStatus } = useDeleteQuestion({
    questionId,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [queryKey.question, "list"],
      })

      replace("/qna")

      setTimeout(() => {
        queueMicrotask(() => {
          openModal({
            content: (
              <SuccessModalContent message={successMessage.deleteQuestion} />
            ),
          })
        })
      }, 700)
    },
    onError(error, variables, context) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (response?.status === HttpStatusCode.Unauthorized) {
          clientSessionReset()

          toast.error("로그인 이후 다시 시도해주세요", {
            position: "top-center",
          })

          return
        }

        toast.error(response?.data.msg ?? "질문 삭제에 실패했습니다", {
          position: "top-center",
        })

        return
      }

      toast.error("질문 삭제에 실패했습니다", {
        position: "top-center",
        toastId: "deleteQuestionError",
      })
    },
  })

  const navigateEditQuestionPage = () => {
    push(`/question/u/${questionId}`)
  }

  const deleteQuestion = () => {
    const onAgreeDeleteQuestion = () => {
      if (deleteQuestionApiStatus === "pending") return

      deleteQuestionApi()
    }

    const onCancelDeleteQuestion = () => {
      toast.error(cancelMessage.deleteQuestion, {
        toastId: "cancleDeleteQuestion",
        position: "top-center",
      })
    }

    openModal({
      containsHeader: false,
      content: (
        <ConfirmModal.ModalContent
          onSuccess={onAgreeDeleteQuestion}
          onCancel={onCancelDeleteQuestion}
          situation="deleteContent"
        />
      ),
    })
  }

  return { navigateEditQuestionPage, deleteQuestion }
}

export default useHandleQuestion

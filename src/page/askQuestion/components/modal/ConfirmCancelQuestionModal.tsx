"use client"

import {
  ImageFieldArrayItem,
  QuestionPageMode,
} from "@/interfaces/form/question-form"
import { useQueryClient } from "@tanstack/react-query"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import Spacing from "@/components/shared/Spacing"
import { useRouter } from "next/navigation"
import { getHistorySessionPath } from "@/util/historySession/path"
import { deleteImages } from "@/service/images"

interface ConfirmCancelQuestionModalProps {
  mode: QuestionPageMode
  imagesToDelete: ImageFieldArrayItem[]
  questionId?: number
}

function ConfirmCancelQuestionModal({
  mode,
  imagesToDelete,
  questionId,
}: ConfirmCancelQuestionModalProps) {
  const queryClient = useQueryClient()
  const { replace } = useRouter()

  const { closeModal } = useModal()

  const initialPath = "/qna?page=0"

  const onAgreeCancel = async () => {
    queryClient.invalidateQueries({
      queryKey: ["question", "list"],
    })

    if (imagesToDelete?.length) {
      await Promise.allSettled(
        imagesToDelete.map(({ uploadURL }) =>
          deleteImages({ imageUrl: uploadURL }),
        ),
      )
    }

    setTimeout(() => {
      if (mode === "create") {
        const historySession = getHistorySessionPath()

        if (!historySession) {
          replace(initialPath)
          return
        }

        const prevURL = new URL(
          historySession.prevPath ?? "/",
          process.env.NEXT_PUBLIC_SITE_URL,
        )

        if (!prevURL.pathname.startsWith("/qna")) {
          replace(initialPath)
          return
        }

        replace(`/qna?${prevURL.searchParams.toString()}`)

        setTimeout(() => {
          closeModal()
        }, 0)

        return
      }

      replace(`/question/${questionId}`)

      setTimeout(() => {
        closeModal()
      }, 0)
    }, 0)
  }

  const onClose = () => {
    closeModal()
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        {mode === "create" ? "질문 작성" : "질문 수정"}을 취소 하시겠습니까?
      </p>
      <Spacing size={26} />
      <div className="flex w-full gap-x-2 justify-center items-center">
        <Button buttonTheme="primary" onClick={onAgreeCancel}>
          {mode === "create" ? "작성 취소" : "수정 취소"}
        </Button>
        <Button buttonTheme="secondary" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  )
}

export default ConfirmCancelQuestionModal

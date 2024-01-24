"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useRouter } from "next/navigation"
import { useToastUiQuestionEditor } from "@/hooks/editor/useToastuiQuestionEditor"
import { DELETE_IMAGE_LOCAL_STORAGE_KEY } from "@/constants/editor"
import type { EditMode } from "./AskQuestionPageControl"

interface CancelAskQuestionModalProps {
  questionId?: number
  editMode: EditMode
}

function CancelAskQuestionModal({
  questionId,
  editMode,
}: CancelAskQuestionModalProps) {
  const { replace } = useRouter()

  const { cancelQuestionSubmit } = useToastUiQuestionEditor({
    uniqueKey: editMode,
  })

  const handleCancel = async () => {
    try {
      await cancelQuestionSubmit({ editMode: editMode })
      localStorage.removeItem(DELETE_IMAGE_LOCAL_STORAGE_KEY)
    } catch (error) {
    } finally {
      queueMicrotask(() => {
        editMode === "create"
          ? replace("/")
          : replace(`/question/${questionId}`)
      })
    }

    return
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">
        {editMode === "create" ? "질문 작성" : "질문 수정"}을 취소 하시겠습니까?
      </p>
      <Spacing size={26} />
      <div className="flex w-full justify-center items-center">
        <Button buttonTheme="primary" onClick={handleCancel}>
          {editMode === "create" ? "작성 취소" : "수정 취소"}
        </Button>
      </div>
    </div>
  )
}

export default CancelAskQuestionModal

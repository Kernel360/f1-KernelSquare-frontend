"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { questionEditorState } from "@/recoil/atoms/questionEditor"
import { useRouter } from "next/navigation"
import { useRecoilValue } from "recoil"
import { EditMode } from "./AskQuestionPageControl"

interface CancelAskQuestionModalProps {
  questionId?: number
  editMode?: EditMode
}

function CancelAskQuestionModal({
  questionId,
  editMode,
}: CancelAskQuestionModalProps) {
  const { replace } = useRouter()

  const { setQustionEditCancelByUser, cancelQuestionSubmit } =
    useRecoilValue(questionEditorState)

  const handleCancel = async () => {
    await cancelQuestionSubmit(editMode)
    setQustionEditCancelByUser(true)

    queueMicrotask(() => {
      if (editMode === "update") {
        replace(`/question/${questionId}`)

        return
      }

      replace("/")
    })

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
          작성 취소
        </Button>
      </div>
    </div>
  )
}

export default CancelAskQuestionModal

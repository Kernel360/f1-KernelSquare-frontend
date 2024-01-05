"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { questionEditorState } from "@/recoil/atoms/questionEditor"
import { useRouter } from "next/navigation"
import { useRecoilValue } from "recoil"

function CancelAskQuestionModal() {
  const { replace } = useRouter()

  const { cancelQuestionSubmit } = useRecoilValue(questionEditorState)

  const handleCancel = async () => {
    await cancelQuestionSubmit()

    replace("/")

    return
  }

  return (
    <div className="w-full sm:w-[320px]">
      <p className="text-center">질문 작성을 취소 하시겠습니까?</p>
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

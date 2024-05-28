"use client"

import { useQuestionFormContext } from "../../hooks/useQuestionFormContext"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import { QuestionPageMode } from "@/interfaces/form/question-form"
import ConfirmCancelQuestionModal from "../modal/ConfirmCancelQuestionModal"

interface QuestionControlProps {
  mode: QuestionPageMode
  questionId?: number
}

function QuestionControl({ mode, questionId }: QuestionControlProps) {
  const {
    imageFieldArray,
    formState: { isLoading, isSubmitting },
    formId,
  } = useQuestionFormContext()

  const { openModal } = useModal()

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.detail === 0) e.preventDefault()
  }

  const onCancel = () => {
    openModal({
      containsHeader: false,
      content: (
        <ConfirmCancelQuestionModal
          questionId={questionId}
          mode={mode}
          imagesToDelete={mode === "create" ? imageFieldArray.fields : []}
        />
      ),
    })
  }

  if (isLoading) return null

  return (
    <div className="fixed left-0 pc:left-[199px] right-0 bottom-0 bg-gradient-to-b from-white/0 to-[36px] to-white pt-9 pb-12 z-[9]">
      <div className="animate-in slide-in-from-bottom-12 [animation-duration:400ms] flex w-full gap-x-4 justify-center items-center bg-white">
        <Button
          className="basis-[162px] pc:basis-[116px] h-12 bg-white text-secondary border border-secondary pointerhover:hover:bg-secondary pointerhover:hover:text-white disabled:bg-colorsGray disabled:border-colorsGray disabled:text-colorsDarkGray disabled:pointerhover:hover:cursor-default disabled:pointerhover:hover:bg-colorsGray disabled:pointerhover:hover:border-colorsGray"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {mode === "create" ? "작성 취소" : "수정 취소"}
        </Button>
        <Button
          form={formId}
          type="submit"
          className="basis-[162px] pc:basis-[116px] h-12 bg-primary text-white border border-primary pointerhover:hover:border-[#02a35f] pointerhover:hover:bg-[#02a35f] disabled:bg-colorsGray disabled:border-colorsGray disabled:text-colorsDarkGray disabled:pointerhover:hover:cursor-default disabled:pointerhover:hover:bg-colorsGray disabled:pointerhover:hover:border-colorsGray"
          disabled={isSubmitting}
          onClick={submit}
        >
          {mode === "create"
            ? isSubmitting
              ? "질문 작성 중"
              : "질문 작성"
            : isSubmitting
            ? "질문 수정 중"
            : "질문 수정"}
        </Button>
      </div>
    </div>
  )
}

export default QuestionControl

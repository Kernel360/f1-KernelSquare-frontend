"use client"

import useHandleQuestion from "../../hooks/useHandleQuestion"
import useQnADetail from "../../hooks/useQnADetail"
import buttonMessage from "@/constants/message/button"
import Button from "@/components/shared/button/Button"
import type { Question } from "@/interfaces/question"

export interface QuestionControlProps {
  question: Question
}

const QuestionControl: React.FC<QuestionControlProps> = ({ question }) => {
  const { navigateEditQuestionPage, deleteQuestion } = useHandleQuestion({
    questionId: question.id,
  })
  const { user } = useQnADetail()

  if (!user) return null
  if (user.member_id !== question.member_id) return null

  return (
    <div className="flex w-full gap-1 justify-end items-center">
      <Button
        onClick={navigateEditQuestionPage}
        className="border-none hover:text-primary font-bold cursor-pointer text-sm shrink-0 p-0.5"
      >
        {buttonMessage.edit}
      </Button>
      <span>&bull;</span>
      <Button
        onClick={deleteQuestion}
        className="hover:text-danger font-bold cursor-pointer text-sm shrink-0 p-0.5"
      >
        {buttonMessage.delete}
      </Button>
    </div>
  )
}

export default QuestionControl

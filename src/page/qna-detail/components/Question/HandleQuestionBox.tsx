"use client"

import useHandleQuestion from "../../hooks/useHandleQuestion"
import SuccessModalContent from "../SuccessModalContent"
import useQnADetail from "../../hooks/useQnADetail"
import successMessage from "@/constants/message/success"
import type { Question } from "@/interfaces/question"
import buttonMessage from "@/constants/message/button"
import Button from "@/components/shared/button/Button"

export interface HandleQuestionBoxProps {
  question: Question
}

const HandleQuestionBox: React.FC<HandleQuestionBoxProps> = ({ question }) => {
  const { handleEditQuestion, handleDeleteQuestion } = useHandleQuestion()
  const { user } = useQnADetail()

  if (!user) return null
  if (user.member_id !== question.member_id) return null

  return (
    <div className="flex w-full gap-1 justify-end items-center">
      <Button
        onClick={() => handleEditQuestion({ questionId: question.id })}
        className="border-none hover:text-primary font-bold cursor-pointer text-sm shrink-0 p-0.5"
      >
        {buttonMessage.edit}
      </Button>
      <span>&bull;</span>
      <Button
        onClick={() =>
          handleDeleteQuestion({
            question,
            successModal: (
              <SuccessModalContent message={successMessage.deleteQuestion} />
            ),
          })
        }
        className="hover:text-danger font-bold cursor-pointer text-sm shrink-0 p-0.5"
      >
        {buttonMessage.delete}
      </Button>
    </div>
  )
}

export default HandleQuestionBox

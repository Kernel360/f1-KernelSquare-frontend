"use client"

import type { Question } from "@/interfaces/question"
import useHandleQuestion from "../../hooks/useHandleQuestion"
import SuccessModalContent from "../SuccessModalContent"
import { useClientSession } from "@/hooks/useClientSession"

interface HandleQuestionProps {
  question: Question
}

const HandleQuestionBox = ({ question }: HandleQuestionProps) => {
  const { handleEditQuestion, handleDeleteQuestion } = useHandleQuestion()
  const { user } = useClientSession()

  if (user?.nickname === question.nickname)
    return (
      <div>
        <div className="flex pt-3">
          <div
            onClick={() => handleEditQuestion({ questionId: question.id })}
            className="mr-3 cursor-pointer hover:text-primary font-bold"
          >
            수정하기
          </div>
          <div
            onClick={() =>
              handleDeleteQuestion({
                question,
                successModal: <SuccessModalContent />,
              })
            }
            className="cursor-pointer hover:text-primary font-bold"
          >
            삭제하기
          </div>
        </div>
      </div>
    )
}

export default HandleQuestionBox

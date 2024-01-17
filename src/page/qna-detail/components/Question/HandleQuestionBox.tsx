"use client"

import type { Question } from "@/interfaces/question"
import useHandleQuestion from "../../hooks/useHandleQuestion"
import SuccessModalContent from "../SuccessModalContent"
import useQnADetail from "../../hooks/useQnADetail"
import { successMessage } from "@/constants/message"

interface HandleQuestionProps {
  question: Question
}

const HandleQuestionBox = ({ question }: HandleQuestionProps) => {
  const { handleEditQuestion, handleDeleteQuestion } = useHandleQuestion()
  const { user } = useQnADetail()

  if (user?.nickname === question.nickname)
    return (
      <div className="flex pt-3 flex-wrap">
        <div
          onClick={() => handleEditQuestion({ questionId: question.id })}
          className="mr-3 cursor-pointer hover:text-primary font-bold min-w-[70px]"
        >
          수정하기
        </div>
        <div
          onClick={() =>
            handleDeleteQuestion({
              question,
              successModal: (
                <SuccessModalContent message={successMessage.deleteQuestion} />
              ),
            })
          }
          className="cursor-pointer hover:text-primary font-bold min-w-[70px]"
        >
          삭제하기
        </div>
      </div>
    )
}

export default HandleQuestionBox

"use client"

import type { Question } from "@/interfaces/question"
import useHandleQuestion from "../../hooks/useHandleQuestion"
import SuccessModalContent from "../SuccessModalContent"
import useQnADetail from "../../hooks/useQnADetail"
import { buttonMessage, successMessage } from "@/constants/message"
import type { HandleQuestionBoxProps } from "./HandleQuestionBox.types"

const HandleQuestionBox: React.FC<HandleQuestionBoxProps> = ({ question }) => {
  const { handleEditQuestion, handleDeleteQuestion } = useHandleQuestion()
  const { user } = useQnADetail()

  if (user?.nickname === question.nickname)
    return (
      <div className="flex pt-3 flex-wrap">
        <div
          onClick={() => handleEditQuestion({ questionId: question.id })}
          className="mr-3 cursor-pointer hover:text-primary font-bold min-w-[70px]"
        >
          {buttonMessage.edit}
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
          {buttonMessage.delete}
        </div>
      </div>
    )
}

export default HandleQuestionBox

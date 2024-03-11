"use client"

import buttonMessage from "@/constants/message/button"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import SuccessModalContent from "../SuccessModalContent"
import type { Answer } from "@/interfaces/answer"
import successMessage from "@/constants/message/success"

export type HandleAnswerProps = {
  answer: Answer
  createdby?: string
}

const HandleAnswerBox: React.FC<HandleAnswerProps> = ({
  answer,
  createdby,
}) => {
  const isMyAnswer = createdby === answer.created_by
  const { handleEditMode, handleDeleteValue, isAnswerEditMode } =
    useHandleMyAnswer({
      answerId: Number(answer.answer_id),
      questionId: Number(answer.question_id),
    })

  if (isMyAnswer && !isAnswerEditMode)
    return (
      <div className="flex flex-wrap justify-end my-4">
        <div
          onClick={() => handleEditMode()}
          className="mr-3 hover:text-[#3887BE] font-bold cursor-pointer "
        >
          {buttonMessage.edit}
        </div>
        <div
          onClick={() =>
            handleDeleteValue({
              answer,
              successModal: (
                <SuccessModalContent message={successMessage.deleteAnswer} />
              ),
            })
          }
          className="hover:text-[#3887BE] font-bold cursor-pointer "
        >
          {buttonMessage.delete}
        </div>
      </div>
    )
}

export default HandleAnswerBox

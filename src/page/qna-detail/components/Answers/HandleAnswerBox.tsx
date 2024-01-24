"use client"

import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import SuccessModalContent from "../SuccessModalContent"
import { buttonMessage, successMessage } from "@/constants/message"
import type { HandleAnswerProps } from "./HandleAnswerBox.types"

const HandleAnswerBox: React.FC<HandleAnswerProps> = ({
  answer,
  createdby,
}) => {
  const isMyAnswer = createdby === answer.created_by
  const { handleEditMode, handleDeleteValue } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
    questionId: Number(answer.question_id),
  })

  if (isMyAnswer)
    return (
      <div className="flex flex-wrap justify-end my-4">
        <div
          onClick={handleEditMode}
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

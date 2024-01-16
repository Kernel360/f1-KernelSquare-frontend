"use client"

import type { Answer } from "@/interfaces/answer"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import SuccessModalContent from "../SuccessModalContent"
import { successMessage } from "@/constants/message"

type HandleAnswerProps = {
  answer: Answer
  createdby?: string
}

const HandleAnswerBox = ({ answer, createdby }: HandleAnswerProps) => {
  const isMyAnswer = createdby === answer.created_by
  const { handleEditMode, handleDeleteValue } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
  })

  if (isMyAnswer)
    return (
      <div className="flex">
        <div
          onClick={handleEditMode}
          className="mr-3 hover:text-[#3887BE] font-bold cursor-pointer "
        >
          수정하기
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
          삭제하기
        </div>
      </div>
    )
}

export default HandleAnswerBox

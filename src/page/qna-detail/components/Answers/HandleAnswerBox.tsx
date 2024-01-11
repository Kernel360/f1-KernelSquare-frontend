import type { Answer } from "@/interfaces/answer"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import ProgressModal from "@/page/signup/components/ProgressModal"
import DeleteSuccess from "@/components/shared/animation/DeleteSuccess"
import { successMessage } from "@/constants/message"
import { useCallback } from "react"

type HandleAnswerProps = {
  answer: Answer
  createdby?: string
}

const HandleAnswerBox = ({ answer, createdby }: HandleAnswerProps) => {
  const isMyAnswer = createdby === answer.created_by
  const { handleEditMode, handleDeleteValue } = useHandleMyAnswer()

  const SuccessModalContent = useCallback(() => {
    return (
      <ProgressModal.Success>
        <ProgressModal.StepContentWrapper>
          <DeleteSuccess style={{ width: "100px" }} />
          <p className="font-bold">{successMessage.deleteAnswer}</p>
        </ProgressModal.StepContentWrapper>
      </ProgressModal.Success>
    )
  }, [])

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
              successModal: <SuccessModalContent />,
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

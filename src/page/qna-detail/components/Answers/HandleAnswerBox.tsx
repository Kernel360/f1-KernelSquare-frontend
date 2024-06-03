"use client"

import buttonMessage from "@/constants/message/button"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import { useClientSession } from "@/hooks/useClientSession"
import Button from "@/components/shared/button/Button"
import type { Answer } from "@/interfaces/answer"

export type HandleAnswerProps = {
  answer: Answer
}

const HandleAnswerBox: React.FC<HandleAnswerProps> = ({ answer }) => {
  const { user } = useClientSession()

  const { deleteAnswer, answerIsEditMode, answerSetToEditMode } =
    useHandleMyAnswer({
      answerId: Number(answer.answer_id),
      questionId: Number(answer.question_id),
    })

  const isMyAnswer = user ? user.member_id === answer.answer_member_id : false

  const changeToUpdateMode = () => {
    answerSetToEditMode()
  }

  if (user && isMyAnswer && !answerIsEditMode) {
    return (
      <div className="flex w-full [&>*]:text-xs gap-0.5 @[396px]:[&>*]:text-sm @[396px]:gap-3 justify-end items-center h-8">
        <UpdateModeButton onClick={changeToUpdateMode} />
        <span>&bull;</span>
        <DeleteAnswerButton onClick={deleteAnswer} />
      </div>
    )
  }

  return null
}

export default HandleAnswerBox

const UpdateModeButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="border-none hover:text-primary font-bold cursor-pointer text-sm shrink-0 p-0.5"
    >
      {buttonMessage.edit}
    </Button>
  )
}

const DeleteAnswerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="hover:text-danger font-bold cursor-pointer text-sm shrink-0 p-0.5"
    >
      {buttonMessage.delete}
    </Button>
  )
}

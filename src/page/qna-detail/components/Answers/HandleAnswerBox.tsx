"use client"

import buttonMessage from "@/constants/message/button"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import SuccessModalContent from "../SuccessModalContent"
import type { Answer } from "@/interfaces/answer"
import successMessage from "@/constants/message/success"
import { useClientSession } from "@/hooks/useClientSession"
import Button from "@/components/shared/button/Button"
import { useResetRecoilState } from "recoil"
import { answerEditorAtomFamily } from "@/recoil/atoms/answerEditor"
import { toast } from "react-toastify"
import { AxiosError, HttpStatusCode } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"

export type HandleAnswerProps = {
  answer: Answer
}

const HandleAnswerBox: React.FC<HandleAnswerProps> = ({ answer }) => {
  const { user, clientSessionReset } = useClientSession()

  const resetAnswerEditorAtom = useResetRecoilState(
    answerEditorAtomFamily(answer.answer_id),
  )

  const { setIsAnswerEditMode, handleDeleteValue, isAnswerEditMode } =
    useHandleMyAnswer({
      answerId: Number(answer.answer_id),
      questionId: Number(answer.question_id),
    })

  const isMyAnswer = user ? user.nickname === answer.member_nickname : false

  const changeToUpdateMode = () => setIsAnswerEditMode(true)
  const deleteAnswer = () => {
    handleDeleteValue({
      answer,
      onDeleteSuccess() {
        resetAnswerEditorAtom()
      },
      onDeleteError(error) {
        if (error instanceof AxiosError) {
          const { response } = error as AxiosError<APIResponse>

          if (response?.status === HttpStatusCode.Unauthorized) {
            clientSessionReset()

            setTimeout(() => {
              toast.error("로그인 후 답변 삭제가 가능합니다.", {
                position: "top-center",
                toastId: "deleteAnswerUnauthorizedError",
              })
            }, 0)

            return
          }

          toast.error("답변 삭제에 실패했습니다.", {
            position: "top-center",
            toastId: "deleteAnswerError",
          })

          return
        }

        toast.error("답변 삭제에 실패했습니다.", {
          position: "top-center",
          toastId: "deleteAnswerError",
        })
      },
      successModal: (
        <SuccessModalContent message={successMessage.deleteAnswer} />
      ),
    })
  }

  if (user && isMyAnswer && !isAnswerEditMode) {
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

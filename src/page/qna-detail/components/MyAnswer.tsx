"use client"

import { useController } from "react-hook-form"
import Button from "@/components/shared/button/Button"
import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import { Answer } from "@/interfaces/answer"
import { QUESTION_ANSWER_LIMITS } from "@/constants/limitation"
import TextCounter from "@/components/shared/TextCounter"
import { useClientSession } from "@/hooks/useClientSession"
import UploadedAnswerImages from "@/components/shared/toast-ui-editor/editor/UploadedAnswerImages"
import AnswerFormProvider from "./formProvider/AnswerFormProvider"
import { useAnswerFormContext } from "@/hooks/editor/useAnswerFormContext"
import CreateAnswerForm from "./Answers/form/CreateAnswerForm"

export interface MyAnswerProps {
  questionId: number
  list?: Answer[]
  isQuestionAuthor: boolean
}

const MyAnswer: React.FC<MyAnswerProps> = ({
  questionId,
  list,
  isQuestionAuthor,
}) => {
  const { user } = useClientSession()
  const { openModal } = useModal()

  const hasIncludeMyAnswer = (list?: Answer[]) => {
    return list?.some((answer) => answer.answer_member_id === user?.member_id)
  }

  const writableNewAnswer =
    user && !isQuestionAuthor && !hasIncludeMyAnswer(list)

  if (!user) {
    return (
      <div className="box-border flex flex-col h-[342px] tablet:h-auto tablet:flex-row justify-between items-center px-[34px] py-6 tablet:py-0 mb-7 border border-[#E0E0E0] rounded-lg">
        <div className="flex flex-col items-center tablet:flex-row gap-6">
          <div className="w-[200px] min-h-[173px] tablet:w-[120px] tablet:min-h-[104px]">
            <CreateAnswerAnime />
          </div>
          <span className="text-primary font-bold">
            로그인 하고 댓글을 남겨보세요!
          </span>
        </div>
        <Button
          buttonTheme="primary"
          className="px-6 py-4"
          onClick={() => {
            openModal({
              content: <LoginForm />,
            })
          }}
        >
          로그인 하기
        </Button>
      </div>
    )
  }

  if (!writableNewAnswer) {
    return null
  }

  return (
    <AnswerFormProvider>
      <div className="max-w-full box-border rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="font-semibold text-xl text-secondary">내 답변</div>
          <AnswerTextCounter />
        </div>
        <UploadedAnswerImages />
        <CreateAnswerForm questionId={questionId} />
      </div>
    </AnswerFormProvider>
  )
}

export default MyAnswer

const AnswerTextCounter = () => {
  const { control } = useAnswerFormContext()
  const { field } = useController({ control, name: "answer" })

  return (
    <TextCounter
      text={field.value}
      min={QUESTION_ANSWER_LIMITS.content.minLength}
      max={QUESTION_ANSWER_LIMITS.content.maxLength}
      className="text-lg"
    />
  )
}

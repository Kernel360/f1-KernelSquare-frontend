"use client"

import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import dynamic from "next/dynamic"
import UpdateAnswerForm from "./form/UpdateAnswerForm"
import AnswerFormProvider from "../formProvider/AnswerFormProvider"
import UploadedAnswerImages from "@/components/shared/toast-ui-editor/editor/UploadedAnswerImages"
import { type PropsWithChildren } from "react"
import type { Answer } from "@/interfaces/answer"

export type EditAnswerProps = {
  answer: Answer
}

const AnswerMdViewer = dynamic(
  () => import("@/components/shared/toast-ui-editor/viewer/ContentViewer"),
  {
    ssr: false,
    loading(loadingProps) {
      // 답변 콘텐츠 로딩 (답변 viewer 로딩)
      return <div className="skeleton w-full h-9 rounded-md mt-2.5" />
    },
  },
)

const AnswerContentBox: React.FC<EditAnswerProps> = ({ answer }) => {
  const { answerIsEditMode } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
    questionId: Number(answer.question_id),
  })

  /**
   * 답변 보기 상태일 경우
   */
  if (!answerIsEditMode)
    return (
      <Wrapper>
        <AnswerMdViewer domain="question" content={answer.content} />
      </Wrapper>
    )

  /**
   * 답변 수정 상태일 경우
   */
  return (
    <Wrapper>
      <AnswerFormProvider answer={answer}>
        <UploadedAnswerImages />
        <UpdateAnswerForm answer={answer} />
      </AnswerFormProvider>
    </Wrapper>
  )
}

export default AnswerContentBox

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
)

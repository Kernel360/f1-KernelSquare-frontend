"use client"

import { useForm } from "react-hook-form"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import { type PropsWithChildren, useRef } from "react"
import type { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import dynamic from "next/dynamic"
import type { EditAnswerProps } from "./AnswerContentBox.types"

const MdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
})

const MdEditor = dynamic(() => import("../Markdown/MdEditor"), {
  ssr: false,
})

const AnswerContentBox: React.FC<EditAnswerProps> = ({ answer }) => {
  const editorRef = useRef<Editor>(null)
  const { handleSubmit } = useForm()
  const { handleEditValue, isAnswerEditMode } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
  })

  const handleSubmitEditedValue = () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    handleEditValue({
      submitValue,
      answer,
    })
  }

  /**
   * 답변 보기 상태일 경우
   */
  if (!isAnswerEditMode)
    return (
      <Wrapper>
        <MdViewer content={answer.content} />
      </Wrapper>
    )

  /**
   * 답변 수정 상태일 경우
   */
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleSubmitEditedValue)}>
        <MdEditor previous={answer.content} editorRef={editorRef} />
        <div className="flex justify-center my-5">
          <Button buttonTheme="primary" className="p-2 w-[100px]" type="submit">
            저장하기
          </Button>
        </div>
      </form>
    </Wrapper>
  )
}

export default AnswerContentBox

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="w-[90%]">{children}</div>
)

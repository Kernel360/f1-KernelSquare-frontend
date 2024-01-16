"use client"

import { useForm } from "react-hook-form"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import { useRef } from "react"
import type { Editor } from "@toast-ui/react-editor"
import type { Answer } from "@/interfaces/answer"
import Button from "@/components/shared/button/Button"
import dynamic from "next/dynamic"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"

const MdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
})

const MdEditor = dynamic(() => import("../Markdown/MdEditor"), {
  ssr: false,
})

type EditAnswerProps = {
  answer: Answer
}

const AnswerContentBox = ({ answer }: EditAnswerProps) => {
  const editorRef = useRef<Editor>(null)
  const { handleSubmit } = useForm()
  const { handleEditValue, isAnswerEditMode } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
  })
  const queryClient = useQueryClient()

  const handleSubmitEditedValue = () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    handleEditValue({
      submitValue,
      answer,
    })
  }
  return (
    <div className="w-[90%]">
      {isAnswerEditMode ? (
        <form onSubmit={handleSubmit(handleSubmitEditedValue)}>
          <MdEditor previous={answer.content} editorRef={editorRef} />
          <div className="flex justify-center my-5">
            <Button
              buttonTheme="primary"
              className="p-2 w-[100px]"
              type="submit"
            >
              저장하기
            </Button>
          </div>
        </form>
      ) : (
        <MdViewer content={answer.content} />
      )}
    </div>
  )
}

export default AnswerContentBox

import { useForm } from "react-hook-form"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import { useCallback, useRef } from "react"
import type { Editor } from "@toast-ui/react-editor"
import type { Answer } from "@/interfaces/answer"
import Button from "@/components/shared/button/Button"
import dynamic from "next/dynamic"

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
  const { handleEditValue, isAnswerEditMode } = useHandleMyAnswer()

  const handleSubmitEditedValue = useCallback(() => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    handleEditValue({
      submitValue,
      answer,
    })
  }, [answer, handleEditValue])

  if (!isAnswerEditMode) return <MdViewer content={answer.content} />

  return (
    <div className="w-[90%]">
      <form onSubmit={handleSubmit(handleSubmitEditedValue)}>
        <MdEditor previous={answer.content} editorRef={editorRef} />
        <div className="flex justify-center my-5">
          <Button buttonTheme="primary" className="p-2 w-[50px]" type="submit">
            저장하기
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AnswerContentBox

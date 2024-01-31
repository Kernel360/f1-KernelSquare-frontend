"use client"

import { useForm } from "react-hook-form"
import useHandleMyAnswer from "../../hooks/useHandleMyAnswer"
import { type PropsWithChildren, useRef } from "react"
import type { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import dynamic from "next/dynamic"
import useQnADetail from "../../hooks/useQnADetail"
import { toast } from "react-toastify"
import { errorMessage, successMessage } from "@/constants/message"
import Regex from "@/constants/regex"
import { answerQueries } from "@/react-query/answers"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import type { Answer } from "@/interfaces/answer"
import type { EditorType } from "@toast-ui/editor"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"
import { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import { deleteImages } from "@/service/images"

export type EditAnswerProps = {
  answer: Answer
}

const MdViewer = dynamic(() => import("../Markdown/MdViewer"), {
  ssr: false,
})

const MdEditor = dynamic(() => import("../Markdown/MdEditor"), {
  ssr: false,
})

export interface AnswerFormData {
  content: string
}

const AnswerContentBox: React.FC<EditAnswerProps> = ({ answer }) => {
  const editorRef = useRef<Editor>(null)
  const { handleSubmit } = useForm<AnswerFormData>()
  const { isAnswerEditMode, setIsAnswerEditMode } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
    questionId: Number(answer.question_id),
  })
  const { checkNullValue } = useQnADetail({ questionId: answer.question_id })
  const { updateAnswer } = answerQueries.useUpdateAnswer()
  const queryClient = useQueryClient()

  /**
   *
   * @returns 답변 수정
   */
  const handleSubmitEditedValue = () => {
    const previousImage = answer.answer_image_url
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    if (!submitValue || checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    const imageUrl = findImageLinkUrlFromMarkdown(submitValue)
    console.log("prev", previousImage, "img", imageUrl)
    const updateProps: UpdateAnswerRequest = {
      answerId: answer.answer_id,
      content: submitValue,
      image_url: null,
    }
    if (!imageUrl) updateProps.image_url = null
    if (imageUrl && imageUrl[0]) updateProps.image_url = imageUrl[0]

    updateAnswer(updateProps, {
      onSuccess: () => {
        toast.success(successMessage.updateAnswer, {
          position: "top-center",
        })
        setIsAnswerEditMode(false)
        if (
          (previousImage && !imageUrl) ||
          (previousImage && imageUrl && previousImage !== imageUrl[0])
        ) {
          deleteImages({ imageUrl: previousImage })
        }
        return queryClient.resetQueries({
          queryKey: [queryKey.answer, answer.question_id],
          exact: true,
        })
      },
      onError: () =>
        toast.error(errorMessage.updateAnswer, { position: "top-center" }),
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

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
import { answerQueries } from "@/react-query/answers"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import type { Answer } from "@/interfaces/answer"
import { findImageLinkUrlFromMarkdown } from "@/util/editor"
import { UpdateAnswerRequest } from "@/interfaces/dto/answer/update-answer.dto"
import { deleteImages } from "@/service/images"
import Limitation from "@/constants/limitation"
import TextCounter from "@/components/shared/TextCounter"

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
  answer: string
}

const AnswerContentBox: React.FC<EditAnswerProps> = ({ answer }) => {
  const editorRef = useRef<Editor>(null)
  const { handleSubmit, register, setValue, watch } = useForm<AnswerFormData>()
  const { isAnswerEditMode, setIsAnswerEditMode } = useHandleMyAnswer({
    answerId: Number(answer.answer_id),
    questionId: Number(answer.question_id),
  })
  const { checkNullValue } = useQnADetail()
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
      toast.error(errorMessage.noAnswerContent, {
        toastId: "emptyAnswerContent",
        position: "top-center",
      })
      return
    }
    if (submitValue.length < Limitation.answer_limit_under) {
      toast.error(errorMessage.underAnswerLimit, {
        toastId: "underAnswerLimit",
        position: "top-center",
      })
      return
    }
    if (submitValue.length > Limitation.answer_limit_over) {
      toast.error(errorMessage.overAnswerLimit, {
        toastId: "overAnswerLimit",
        position: "top-center",
      })
      return
    }
    const imageUrl = findImageLinkUrlFromMarkdown(submitValue)
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
          toastId: "successToUpdateAnswer",
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
        <MdEditor
          previous={answer.content}
          editorRef={editorRef}
          answerId={answer.answer_id}
          onChange={() => {
            setValue(
              "answer",
              editorRef.current?.getInstance().getMarkdown() ?? "",
            )
          }}
        />
        <TextCounterBox text={watch("answer")} />
        <div className="flex justify-center my-5">
          <Button
            disabled={
              !watch("answer") ||
              watch("answer").length < Limitation.answer_limit_under ||
              watch("answer").length > Limitation.answer_limit_over
            }
            buttonTheme="primary"
            className="p-2 w-[100px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
          >
            저장하기
          </Button>
        </div>
        <input hidden className="hidden" {...register("answer")} />
      </form>
    </Wrapper>
  )
}

export default AnswerContentBox

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="w-[90%]">{children}</div>
)

type TextCounterBoxProps = {
  text: string | undefined
}

const TextCounterBox = ({ text }: TextCounterBoxProps) => {
  if (!text) return
  return (
    <TextCounter
      text={text ?? ""}
      min={Limitation.answer_limit_under}
      max={Limitation.answer_limit_over}
      className="text-lg block text-right h-5 py-2"
    />
  )
}

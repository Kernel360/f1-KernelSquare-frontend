"use client"

import dynamic from "next/dynamic"
import { PropsWithChildren, useRef } from "react"
import { useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import useQnADetail from "../hooks/useQnADetail"
import { Answer } from "@/interfaces/answer"
import { toast } from "react-toastify"
import Limitation from "@/constants/limitation"
import TextCounter from "@/components/shared/TextCounter"
import type { AnswerFormData } from "./Answers/AnswerContentBox"
import buttonMessage from "@/constants/message/button"
import notificationMessage from "@/constants/message/notification"
import { validationMessage } from "@/constants/message/validation"

export interface MyAnswerProps {
  questionId: number
  list?: Answer[]
  nickname?: string
}

const MdEditor = dynamic(() => import("../components/Markdown/MdEditor"), {
  ssr: false,
})

const MyAnswer: React.FC<MyAnswerProps> = ({ questionId, list, nickname }) => {
  const { openModal } = useModal()
  const {
    user,
    handleSubmitValue,
    handleCheckAbilityToWriteAnswer,
    checkNullValue,
  } = useQnADetail()

  const { register, setValue, handleSubmit, watch } = useForm<AnswerFormData>()
  const editorRef = useRef<Editor>(null)

  const handleSubmitAnswer = async () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    if (!submitValue || checkNullValue(submitValue)) {
      toast.error(validationMessage.noAnswerContent, {
        toastId: "emptyAnswerContent",
        position: "top-center",
      })
      return
    }
    if (submitValue.length < Limitation.answer_limit_under) {
      toast.error(validationMessage.underAnswerLimit, {
        toastId: "underAnswerLimit",
        position: "top-center",
      })
      return
    }
    if (submitValue.length > Limitation.answer_limit_over) {
      toast.error(validationMessage.overAnswerLimit, {
        toastId: "overAnswerLimit",
        position: "top-center",
      })
      return
    }
    handleSubmitValue({ questionId, submitValue })
  }

  if (!user)
    return (
      <Container>
        <div className="text-center py-5">
          <CreateAnswerAnime style={{ width: "20%", margin: "0 auto" }} />
          <div className="text-xl">
            {notificationMessage.answerWithoutToken}
          </div>
          <Button
            buttonTheme="primary"
            className="mt-5 px-5 py-2"
            onClick={() => openModal({ content: <LoginForm /> })}
          >
            {buttonMessage.goToLogIn}
          </Button>
        </div>
      </Container>
    )

  return (
    handleCheckAbilityToWriteAnswer(list, nickname) && (
      <Container>
        <div>
          <div className="flex items-center gap-2">
            <Title title="My Answer" />
            <TextCounterBox text={watch("answer")} />
          </div>
          <form onSubmit={handleSubmit(handleSubmitAnswer)}>
            <MdEditor
              editorRef={editorRef}
              previous=""
              onChange={() => {
                setValue(
                  "answer",
                  editorRef.current?.getInstance().getMarkdown() ?? "",
                )
              }}
            />
            <div className="flex justify-center my-[20px]">
              <Button
                disabled={
                  !watch("answer") ||
                  watch("answer").length < Limitation.answer_limit_under ||
                  watch("answer").length > Limitation.answer_limit_over
                }
                buttonTheme="primary"
                className="w-[200px] h-[50px] text-lg disabled:bg-colorsGray disabled:text-colorsDarkGray"
                type="submit"
              >
                {buttonMessage.postMyAnswer}
              </Button>
            </div>
            <input hidden className="hidden" {...register("answer")} />
          </form>
        </div>
      </Container>
    )
  )
}

export default MyAnswer

const Title: React.FC<{ title: string }> = ({ title }) => (
  <div className="font-bold text-[24px]">{title}</div>
)

const Container = ({ children }: PropsWithChildren) => (
  <div className="max-w-full box-border border border-colorsGray rounded-lg p-5 my-5">
    {children}
  </div>
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
      className="text-lg"
    />
  )
}

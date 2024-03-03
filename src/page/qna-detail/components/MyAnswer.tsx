"use client"

import dynamic from "next/dynamic"
import { PropsWithChildren, useRef } from "react"
import { useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import {
  buttonMessage,
  errorMessage,
  notificationMessage,
} from "@/constants/message"
import useQnADetail from "../hooks/useQnADetail"
import { Answer } from "@/interfaces/answer"
import { toast } from "react-toastify"
import Limitation from "@/constants/limitation"

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

  const { handleSubmit } = useForm()
  const editorRef = useRef<Editor>(null)

  const handleSubmitAnswer = async () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    if (!submitValue || checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        toastId: "emptyAnswerContent",
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    if (submitValue.length < Limitation.answer_limit_under) {
      toast.error(errorMessage.underAnswerLimit, {
        toastId: "underAnswerLimit",
        position: "top-center",
        autoClose: 1000,
      })
      return
    }
    if (submitValue.length > Limitation.answer_limit_over) {
      toast.error(errorMessage.overAnswerLimit, {
        toastId: "overAnswerLimit",
        position: "top-center",
        autoClose: 1000,
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
          <Title title="My Answer" />
          <form onSubmit={handleSubmit(handleSubmitAnswer)}>
            <MdEditor editorRef={editorRef} previous="" />
            <div className="flex justify-center my-[20px]">
              <Button
                buttonTheme="primary"
                className="w-[200px] h-[50px] text-lg"
                type="submit"
              >
                {buttonMessage.postMyAnswer}
              </Button>
            </div>
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

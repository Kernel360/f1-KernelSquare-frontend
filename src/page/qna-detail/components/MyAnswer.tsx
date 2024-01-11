"use client"

import dynamic from "next/dynamic"
import { PropsWithChildren, useRef } from "react"
import { useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import { createAnswer } from "@/service/answers"
import { useQueryClient } from "@tanstack/react-query"
import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import useModal from "@/hooks/useModal"
import LoginForm from "@/components/form/LoginForm"
import { useClientSession } from "@/hooks/useClientSession"
import { toast } from "react-toastify"
import { errorMessage, successMessage } from "@/constants/message"
import useQnADetail from "../hooks/useQnADetail"
import ProgressModal from "@/page/signup/components/ProgressModal"
import CheckSuccess from "@/components/shared/animation/CheckSuccess"
import { sleep } from "@/util/sleep"

const MdEditor = dynamic(() => import("./Markdown/MdEditor"), {
  ssr: false,
})

const MyAnswer: React.FC<{
  id: number
  isAnswerMode: boolean
  setIsAnswerMode: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ id, isAnswerMode, setIsAnswerMode }) => {
  const { openModal } = useModal()
  const { checkNullValue } = useQnADetail()

  const { handleSubmit } = useForm()
  const editorRef = useRef<Editor>(null)

  const { user } = useClientSession()
  const queryClient = useQueryClient()

  const handleSubmitValue = async () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()

    if (checkNullValue(submitValue)) {
      toast.error(errorMessage.noContent, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      if (user?.member_id) {
        createAnswer({
          questionId: id,
          member_id: user.member_id,
          content: submitValue || "",
        }).then((res) => {
          console.log("res", res.data.msg, res.config.data)
          openModal({
            content: <SuccessModalContent />,
            onClose() {
              queryClient.invalidateQueries({ queryKey: ["answer", id] })
            },
          })
          sleep(5000).then(() => {
            queryClient.invalidateQueries({ queryKey: ["answer", id] })
          })
        })
      }
    } catch (err) {
      console.error("error", err)
    }
    setIsAnswerMode(false)
  }

  const WithToken = () => (
    <div>
      <Title title="My Answer" />
      <form onSubmit={handleSubmit(handleSubmitValue)}>
        <MdEditor editorRef={editorRef} previous="" />
        <div className="flex justify-center my-[20px]">
          <Button
            buttonTheme="primary"
            className="w-[200px] h-[50px] text-lg"
            type="submit"
          >
            Post Your Answer
          </Button>
        </div>
      </form>
    </div>
  )

  const WithoutToken = () => (
    <div className="text-center py-5">
      <CreateAnswerAnime style={{ width: "20%", margin: "0 auto" }} />
      <div className="text-xl">로그인하고 질문에 대한 답변을 남겨보세요!</div>
      <Button
        buttonTheme="primary"
        className="mt-5 px-5 py-2"
        onClick={() => openModal({ content: <LoginForm /> })}
      >
        로그인 하러 가기
      </Button>
    </div>
  )

  if (!user)
    return (
      <Container>
        <WithoutToken />
      </Container>
    )

  return (
    isAnswerMode && (
      <Container>
        <WithToken />
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

const SuccessModalContent = () => {
  return (
    <ProgressModal.Success>
      <ProgressModal.StepContentWrapper>
        <CheckSuccess style={{ width: "100px" }} />
        <p className="font-bold">{successMessage.createAnswer}</p>
      </ProgressModal.StepContentWrapper>
    </ProgressModal.Success>
  )
}

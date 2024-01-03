"use client"

import dynamic from "next/dynamic"
import {
  ButtonHTMLAttributes,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import { createAnswer, updateAnswer } from "@/service/answers"
import { useUserId } from "@/hooks/useUser"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"
import CreateAnswerAnime from "@/components/shared/animation/CreateAnswerAnime"
import useModal from "@/hooks/useModal"
import { getCookie } from "cookies-next"
import { ACCESS_TOKEN_KEY } from "@/constants/token"
import LoginForm from "@/components/form/LoginForm"

const MdEditor = dynamic(() => import("./Markdown/MdEditor"), {
  ssr: false,
})

const MyAnswer: React.FC<{
  id: number
  isEditMode: boolean
  answerId?: number
}> = ({ id, isEditMode, answerId }) => {
  const { openModal } = useModal()
  const token = getCookie(ACCESS_TOKEN_KEY)
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    if (token) setIsToken(true)
  }, [token])

  const { handleSubmit } = useForm()
  const editorRef = useRef<Editor>(null)

  const { data: member_id } = useUserId()
  const queryClient = useQueryClient()

  const [_, setIsAnswerEditMode] = useRecoilState(AnswerEditMode)

  const handleSubmitValue = () => {
    const submitValue: string = editorRef.current?.getInstance().getMarkdown()
    console.log("md", submitValue)
    try {
      if (member_id)
        createAnswer({
          questionId: id,
          member_id,
          content: submitValue,
        }).then((res) => {
          console.log("res", res.data.msg, res.config.data)
          queryClient.invalidateQueries({ queryKey: [queryKey.question, id] })
        })
    } catch (err) {
      console.error("error", err)
    }
    setIsAnswerEditMode(false)
  }

  const handleEditValue = () => {
    const submitValue: string = editorRef.current?.getInstance().getMarkdown()
    console.log("md", submitValue)
    try {
      if (answerId)
        updateAnswer({
          answerId,
          content: submitValue,
        }).then((res) => {
          console.log("res", res.data.msg, res.config.data)
          queryClient.invalidateQueries({ queryKey: [queryKey.answer] })
        })
    } catch (err) {
      console.error("error", err)
    }
    setIsAnswerEditMode(false)
  }

  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-2 my-5">
      {isToken ? (
        <>
          <Title title="My Answer" />
          <form
            onSubmit={handleSubmit(
              isEditMode ? handleEditValue : handleSubmitValue,
            )}
          >
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
        </>
      ) : (
        <div className="text-center py-5">
          <CreateAnswerAnime style={{ width: "20%", margin: "0 auto" }} />
          <div className="text-xl">
            로그인하고 질문에 대한 답변을 남겨보세요!
          </div>
          <Button
            buttonTheme="primary"
            className="mt-5 px-5 py-2"
            onClick={() => openModal({ content: <LoginForm /> })}
          >
            로그인 하러 가기
          </Button>
        </div>
      )}
    </div>
  )
}

export default MyAnswer

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <div className="font-bold text-[24px]">{title}</div>
}

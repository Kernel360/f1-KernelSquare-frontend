"use client"

import dynamic from "next/dynamic"
import { ButtonHTMLAttributes, FormEvent, useRef } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"
import { createAnswer, updateAnswer } from "@/service/answers"
import { useUserId } from "@/hooks/useUser"
import { useQueryClient } from "@tanstack/react-query"
import queryKey from "@/constants/queryKey"

const MdEditor = dynamic(() => import("./Markdown/MdEditor"), {
  ssr: false,
})

const MyAnswer: React.FC<{
  id: number
  isEditMode: boolean
  answerId?: number
}> = ({ id, isEditMode, answerId }) => {
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
      <form
        onSubmit={handleSubmit(
          isEditMode ? handleEditValue : handleSubmitValue,
        )}
      >
        <MdEditor editorRef={editorRef} previous="" />
        <div className="flex justify-center my-[20px]">
          <Button
            buttonTheme="primary"
            className="w-[200px] h-[50px]"
            type="submit"
          >
            Post Your Answer
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MyAnswer

"use client"

import dynamic from "next/dynamic"
import { ButtonHTMLAttributes, useRef } from "react"
import { useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"
import Button from "@/components/shared/button/Button"
import { useRecoilState } from "recoil"
import { AnswerEditMode } from "@/recoil/atoms/mode"

const MdEditor = dynamic(() => import("./Markdown/MdEditor"), {
  ssr: false,
})

const MyAnswer: React.FC<{ id: number }> = ({ id }) => {
  const { handleSubmit } = useForm()
  const editorRef = useRef<Editor>(null)

  const [isAnswerEditMode, setIsAnswerEditMode] = useRecoilState(AnswerEditMode)

  const handleSubmitValue = () => {
    const submitValue = editorRef.current?.getInstance().getMarkdown()
    console.log("md", submitValue)
    setIsAnswerEditMode(false)
  }

  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-2 my-5">
      <form onSubmit={handleSubmit(async (data) => console.log("답변", data))}>
        <MdEditor editorRef={editorRef} previous="" />
        <div className="flex justify-center my-[20px]">
          <Button
            buttonTheme="primary"
            className="w-[100px]"
            type="submit"
            onClick={handleSubmitValue}
          >
            저장
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MyAnswer

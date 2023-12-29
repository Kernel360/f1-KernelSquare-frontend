"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { Editor } from "@toast-ui/react-editor"

const MdEditor = dynamic(() => import("./Markdown/MdEditor"), {
  ssr: false,
})

const MyAnswer: React.FC<{ id: number }> = ({ id }) => {
  const { handleSubmit } = useForm()
  const editorRef = useRef<Editor>(null)

  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-2 my-5">
      <form onSubmit={handleSubmit(async (data) => console.log("답변", data))}>
        <MdEditor editorRef={editorRef} previous="" />
      </form>
    </div>
  )
}

export default MyAnswer

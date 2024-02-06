"use client"

import { useForm } from "react-hook-form"
import useIntroduction from "../../hooks/useIntroduction"
import { useRef } from "react"
import {
  buttonMessage,
  errorMessage,
  notificationMessage,
} from "@/constants/message"
import Button from "@/components/shared/button/Button"
import UserProfileMenu from "../UserProfileMenu"
import dynamic from "next/dynamic"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"

const MdEditor = dynamic(() => import("./MdEditor"), {
  ssr: false,
})

const MdViewer = dynamic(() => import("./MdViewer"), {
  ssr: false,
})

interface IntroductionProps {
  introduction?: string
  isMyPage: boolean
  userId: number | undefined
}

function Introduction({ introduction, isMyPage, userId }: IntroductionProps) {
  const editorRef = useRef<Editor>(null)
  const {
    closeIntroductionEditMode,
    handleSubmitIntroduction,
    isIntroductionEditMode,
  } = useIntroduction()
  const { handleSubmit } = useForm<{ introduction: string }>()

  const onsubmit = () => {
    const introduction = editorRef.current?.getInstance().getMarkdown()
    if (!introduction)
      toast.error(errorMessage.noContent, { position: "top-center" })
    if (introduction) handleSubmitIntroduction(introduction)
  }

  if (isIntroductionEditMode)
    return (
      <UserProfileMenu.MenuContentWrapper>
        <div>
          <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
            <MdEditor
              previous={introduction}
              editorRef={editorRef}
              userId={userId!}
            />
            <div className="flex justify-center mt-[20px]">
              <Button
                buttonTheme="third"
                className="w-[70px] mr-[10px]"
                onClick={closeIntroductionEditMode}
              >
                {buttonMessage.cancle}
              </Button>
              <Button buttonTheme="primary" className="w-[70px]" type="submit">
                {buttonMessage.save}
              </Button>
            </div>
          </form>
        </div>{" "}
      </UserProfileMenu.MenuContentWrapper>
    )

  return (
    <UserProfileMenu.MenuContentWrapper>
      {!introduction && (
        <div className="text-center text-slate-400">
          {notificationMessage.noIntroduction}
        </div>
      )}
      {introduction && <MdViewer content={introduction} />}
    </UserProfileMenu.MenuContentWrapper>
  )
}

export default Introduction

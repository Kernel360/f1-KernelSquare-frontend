"use client"

import { useForm } from "react-hook-form"
import useIntroduction from "../../hooks/useIntroduction"
import { useRef } from "react"
import { buttonMessage, notificationMessage } from "@/constants/message"
import Button from "@/components/shared/button/Button"
import UserProfileMenu from "../UserProfileMenu"
import dynamic from "next/dynamic"
import { Editor } from "@toast-ui/react-editor"
import TextCounter from "@/components/shared/TextCounter"
import Limitation from "@/constants/limitation"

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

function Introduction({ introduction, userId }: IntroductionProps) {
  const editorRef = useRef<Editor>(null)
  const {
    closeIntroductionEditMode,
    handleSubmitIntroduction,
    isIntroductionEditMode,
  } = useIntroduction()
  const { handleSubmit, watch, register, setValue } = useForm<{
    introduction: string
  }>()

  const onsubmit = () => {
    const introduction = editorRef.current?.getInstance().getMarkdown()
    handleSubmitIntroduction(introduction ?? "")
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
              onChange={() => {
                setValue(
                  "introduction",
                  editorRef.current?.getInstance().getMarkdown() ?? "",
                )
              }}
            />
            <TextCounterBox text={watch("introduction")} />
            <div className="flex justify-center mt-[20px]">
              <Button
                buttonTheme="third"
                className="w-[70px] mr-[10px]"
                onClick={closeIntroductionEditMode}
              >
                {buttonMessage.cancle}
              </Button>
              <Button
                buttonTheme="primary"
                className="w-[70px] disabled:bg-colorsGray disabled:text-colorsDarkGray"
                type="submit"
                disabled={
                  !watch("introduction") ||
                  watch("introduction").length <
                    Limitation.introduction_limit_under ||
                  watch("introduction").length >
                    Limitation.introduction_limit_over
                }
              >
                {buttonMessage.save}
              </Button>
            </div>
            <input hidden className="hidden" {...register("introduction")} />
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

type TextCounterBoxProps = {
  text: string | undefined
}

const TextCounterBox = ({ text }: TextCounterBoxProps) => {
  if (!text) return
  return (
    <TextCounter
      text={text ?? ""}
      min={Limitation.introduction_limit_under}
      max={Limitation.introduction_limit_over}
      className="text-lg block text-right h-5 py-2 font-light"
    />
  )
}

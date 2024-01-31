"use client"

import { useForm } from "react-hook-form"
import useIntroduction from "../../hooks/useIntroduction"
import type { IntroductionProps } from "./Introduction.types"
import type { IntroductionValue } from "../../hooks/useIntroduction.types"
import { useRef, useState } from "react"
import { twJoin } from "tailwind-merge"
import {
  buttonMessage,
  errorMessage,
  notificationMessage,
} from "@/constants/message"
import Textarea from "@/components/shared/textarea/Textarea"
import Button from "@/components/shared/button/Button"
import UserProfileMenu from "../UserProfileMenu"
import dynamic from "next/dynamic"
import { Editor } from "@toast-ui/react-editor"
import { toast } from "react-toastify"

const MdEditor = dynamic(() => import("./MdEditor"), {
  ssr: false,
})

function Introduction({ introduction, isMyPage }: IntroductionProps) {
  const editorRef = useRef<Editor>(null)
  const { closeEditMode, handleSubmitIntroduction, isEditMode } =
    useIntroduction()
  const { handleSubmit } = useForm<IntroductionValue>()

  const onsubmit = () => {
    const introduction = editorRef.current?.getInstance().getMarkdown()
    if (!introduction)
      toast.error(errorMessage.noContent, { position: "top-center" })
    if (introduction) handleSubmitIntroduction(introduction)
  }

  if (!introduction) {
    return (
      <UserProfileMenu.MenuContentWrapper>
        <span className="font-bold text-colorsGray text-center block">
          {notificationMessage.noIntroduction}
        </span>
      </UserProfileMenu.MenuContentWrapper>
    )
  }

  if (isMyPage && isEditMode)
    return (
      <UserProfileMenu.MenuContentWrapper>
        <div>
          <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
            <MdEditor previous={introduction} editorRef={editorRef} />
            <div className="flex justify-center mt-[20px]">
              <Button
                buttonTheme="third"
                className="w-[70px] mr-[10px]"
                onClick={closeEditMode}
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
      <p className="whitespace-pre-wrap">{introduction}</p>
    </UserProfileMenu.MenuContentWrapper>
  )
}

export default Introduction

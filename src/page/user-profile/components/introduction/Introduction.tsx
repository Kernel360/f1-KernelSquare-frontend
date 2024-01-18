"use client"

import { useForm } from "react-hook-form"
import useIntroduction from "../../hooks/useIntroduction"
import type { IntroductionProps } from "./Introduction.types"
import type { IntroductionValue } from "../../hooks/useIntroduction.types"
import { useState } from "react"
import { twJoin } from "tailwind-merge"
import { buttonMessage, notificationMessage } from "@/constants/message"
import Textarea from "@/components/shared/textarea/Textarea"
import Button from "@/components/shared/button/Button"
import UserProfileMenu from "../UserProfileMenu"

function Introduction({ introduction, isMyPage }: IntroductionProps) {
  const { closeEditMode, handleSubmitIntroduction, isEditMode } =
    useIntroduction()

  const { handleSubmit, register } = useForm<IntroductionValue>({
    defaultValues: { introduction },
  })

  const [textLen, setTextLen] = useState(introduction?.length ?? 0)

  const styleWithWarning = twJoin([textLen > 300 && "text-[#EF4040]"])

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
          <form
            className="w-full"
            onSubmit={handleSubmit(handleSubmitIntroduction)}
          >
            <Textarea
              fullWidth={true}
              rows={5}
              {...register("introduction", {
                onChange: (e) => setTextLen(e.target.value.length),
              })}
            />
            <div className="text-right">
              <span className={styleWithWarning}>{textLen}</span>
              /300
            </div>
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

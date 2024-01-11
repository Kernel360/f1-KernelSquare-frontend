"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import Textarea from "@/components/shared/textarea/Textarea"
import instructions from "@/constants/instructions"
import useMyPage from "../hooks/useMyPage"
import { type FormEvent, useState } from "react"
import { updateMemberInfo } from "@/service/member"
import { toast } from "react-toastify"
import { errorMessage, successMessage } from "@/constants/message"
import { twJoin } from "tailwind-merge"
import useDebounce from "@/hooks/useDebounce"
import { useClientSession } from "@/hooks/useClientSession"

interface IntroductionProps {
  id: number
  introduction?: string
}

const EditBox: React.FC<{ previous?: string; id: number }> = ({
  previous,
  id,
}) => {
  const { closeEditMode, introduction, setIntroduction } = useMyPage()
  const { clientSessionUpdate } = useClientSession()

  const [textLen, setTextLen] = useState<number>(0)

  const styleWithWarning = twJoin([textLen > 300 && "text-[#EF4040]"])

  const value = useDebounce(introduction, 200)

  const handleChange = (textValue: string) => {
    setIntroduction(textValue)
    setTextLen(textValue.length)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (introduction.length > 300) {
      toast.error(errorMessage.introductionLimit, {
        position: "top-center",
        autoClose: 1000,
      })
      return
    }

    try {
      updateMemberInfo({
        id,
        introduction,
      }).then(() => {
        toast.success(successMessage.editIntroduction, {
          position: "top-center",
          autoClose: 1000,
        })
        clientSessionUpdate({
          introduction,
        })
      })
    } catch (err) {
      console.error("error", err)
    }
    closeEditMode()
  }

  return (
    <div>
      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <Textarea
          fullWidth={true}
          rows={5}
          defaultValue={previous}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="text-right">
          <span className={styleWithWarning}>{textLen}</span>/300
        </div>
        <div className="flex justify-center mt-[20px]">
          <Button
            buttonTheme="third"
            className="w-[70px] mr-[10px]"
            onClick={closeEditMode}
          >
            취소
          </Button>
          <Button buttonTheme="primary" className="w-[70px]" type="submit">
            저장
          </Button>
        </div>
      </form>
    </div>
  )
}

const Introduction = ({ id, introduction }: IntroductionProps) => {
  const { isEditMode, handleEditMode } = useMyPage()

  return (
    <div className="mb-[50px]">
      <div className="flex font-bold text-lg mb-[20px]">
        <div>자기소개</div>
        <Icons.EditIntro
          className="ml-[10px] text-[25px] leading-8 shrink-0 cursor-pointer"
          onClick={handleEditMode}
        />
      </div>
      {isEditMode ? (
        <EditBox previous={introduction} id={id} />
      ) : (
        <div>{introduction || instructions.noIntroduction}</div>
      )}
    </div>
  )
}

export default Introduction

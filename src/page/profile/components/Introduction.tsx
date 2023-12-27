"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import Textarea from "@/components/shared/textarea/Textarea"
import instructions from "@/constants/instructions"
import useMyPage from "../hooks/useMyPage"
import { FormEvent } from "react"
import { updateMemberInfo } from "@/service/member"
import { useQueryClient } from "@tanstack/react-query"

interface IntroductionProps {
  id: number
  introduction?: string
}

const EditBox: React.FC<{ previous?: string; id: number }> = ({
  previous,
  id,
}) => {
  const queryClient = useQueryClient()
  const { closeEditMode, introduction, setIntroduction } = useMyPage()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      updateMemberInfo({
        id,
        introduction,
      }).then((res) => {
        console.log("res", res.data.msg, res.config.data)
        setIntroduction(res.config.data["introduction"])
        queryClient.invalidateQueries({ queryKey: ["user"] })
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
          onChange={(e) => setIntroduction(e.target.value)}
        />
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

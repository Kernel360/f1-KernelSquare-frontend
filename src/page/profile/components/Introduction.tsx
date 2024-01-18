"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import Textarea from "@/components/shared/textarea/Textarea"
import instructions from "@/constants/instructions"
import { twJoin } from "tailwind-merge"
import type { EditBoxProps, IntroductionProps } from "./Introduction.types"
import useIntroduction from "../hooks/useIntroduction"
import { buttonMessage } from "@/constants/message"

const EditBox: React.FC<EditBoxProps> = ({ previous, memberId }) => {
  const { closeEditMode, textLen, handleChange, handleSubmitIntroduction } =
    useIntroduction()

  const styleWithWarning = twJoin([textLen > 300 && "text-[#EF4040]"])

  return (
    <div>
      <form
        className="w-full"
        onSubmit={(e) => handleSubmitIntroduction(e, memberId)}
      >
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
            {buttonMessage.cancle}
          </Button>
          <Button buttonTheme="primary" className="w-[70px]" type="submit">
            {buttonMessage.save}
          </Button>
        </div>
      </form>
    </div>
  )
}

const Introduction: React.FC<IntroductionProps> = ({
  memberId,
  introduction,
}) => {
  const { isEditMode, handleEditMode } = useIntroduction()

  return (
    <div className="mb-[50px]">
      <div className="flex font-bold text-lg mb-[20px]">
        <div>자기소개</div>
        <Icons.EditIntro
          className="ml-[10px] text-[25px] leading-8 shrink-0 cursor-pointer"
          onClick={handleEditMode}
        />
      </div>
      {isEditMode && <EditBox previous={introduction} memberId={memberId} />}
      {!isEditMode && <div>{introduction || instructions.noIntroduction}</div>}
    </div>
  )
}

export default Introduction

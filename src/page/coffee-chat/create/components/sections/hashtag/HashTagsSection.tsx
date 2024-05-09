"use client"

import CoffeeChatSection from "../../CoffeeChatSection"
import Limitation from "@/constants/limitation"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { HashTagList } from "@/recoil/atoms/coffee-chat/hashtags"
import { Control } from "react-hook-form"
import { CoffeeChatFormData } from "@/interfaces/form"
import HashTagsController from "../../../controls/HashTagsController"
import { useEffect } from "react"

interface HashTagsSectionProps {
  control: Control<CoffeeChatFormData, any>
}

const HashTagsSection = ({ control }: HashTagsSectionProps) => {
  const resetHashTagList = useResetRecoilState(HashTagList)

  useEffect(() => {
    return () => {
      resetHashTagList()
    }
  }, []) /* eslint-disable-line */

  return (
    <CoffeeChatSection className="overflow-hidden">
      <HashTagLabel />
      <HashTagsController control={control} />
    </CoffeeChatSection>
  )
}

export default HashTagsSection

const HashTagLabel = () => {
  const hashTagList = useRecoilValue(HashTagList)

  return (
    <CoffeeChatSection.Label htmlFor="hashTag" className="block w-max">
      <span>해시태그</span>
      <span>&nbsp;&#40;&nbsp;</span>
      <span
        className={`${
          hashTagList.length <= Limitation.hashtags_cnt
            ? "text-primary"
            : "text-danger"
        }`}
      >
        {hashTagList.length}
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span>{Limitation.hashtags_cnt}</span>
      <span>&nbsp;&#41;</span>
    </CoffeeChatSection.Label>
  )
}

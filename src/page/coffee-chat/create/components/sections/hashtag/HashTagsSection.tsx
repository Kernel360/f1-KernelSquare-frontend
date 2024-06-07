"use client"

import CoffeeChatSection from "../../CoffeeChatSection"
import { HASHTAG_LIMITS } from "@/constants/limitation"
import HashTagsController from "../../../controls/HashTagsController"
import { useCoffeeChatFormContext } from "@/page/coffee-chat/hooks/useCoffeeChatFormContext"

const HashTagsSection = () => {
  return (
    <CoffeeChatSection className="overflow-hidden">
      <HashTagLabel />
      <HashTagsController />
    </CoffeeChatSection>
  )
}

export default HashTagsSection

const HashTagLabel = () => {
  const { hashTagFieldArray } = useCoffeeChatFormContext()

  return (
    <CoffeeChatSection.Label htmlFor="hashTag" className="block w-max">
      <span>해시태그</span>
      <span>&nbsp;&#40;&nbsp;</span>
      <span
        className={`${
          !hashTagFieldArray.fields?.length ||
          hashTagFieldArray.fields.length <= HASHTAG_LIMITS.tags.maxLength
            ? "text-primary"
            : "text-danger"
        }`}
      >
        {hashTagFieldArray.fields?.length ?? 0}
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span>{HASHTAG_LIMITS.tags.maxLength}</span>
      <span>&nbsp;&#41;</span>
    </CoffeeChatSection.Label>
  )
}

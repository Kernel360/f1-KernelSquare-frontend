"use client"

import CoffeeChatSection from "../../CoffeeChatSection"
import { HASHTAG_LIMITS } from "@/constants/limitation"
import { Control, useController } from "react-hook-form"
import HashTagsController from "../../../controls/HashTagsController"
import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"

interface HashTagsSectionProps {
  control: Control<CoffeeChatFormData, any>
}

const HashTagsSection = ({ control }: HashTagsSectionProps) => {
  return (
    <CoffeeChatSection className="overflow-hidden">
      <HashTagLabel control={control} />
      <HashTagsController control={control} />
    </CoffeeChatSection>
  )
}

export default HashTagsSection

const HashTagLabel = ({
  control,
}: {
  control: Control<CoffeeChatFormData, any>
}) => {
  const { field } = useController({ control, name: "hashTags" })

  return (
    <CoffeeChatSection.Label htmlFor="hashTag" className="block w-max">
      <span>해시태그</span>
      <span>&nbsp;&#40;&nbsp;</span>
      <span
        className={`${
          !field?.value?.length ||
          field.value.length <= HASHTAG_LIMITS.tags.maxLength
            ? "text-primary"
            : "text-danger"
        }`}
      >
        {field?.value?.length ?? 0}
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span>{HASHTAG_LIMITS.tags.maxLength}</span>
      <span>&nbsp;&#41;</span>
    </CoffeeChatSection.Label>
  )
}

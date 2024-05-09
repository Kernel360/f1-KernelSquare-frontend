"use client"

import HashTag from "@/components/shared/tag/HashTag"
import { CoffeeChatReservationHashTag } from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"
import { useId } from "react"

interface CoffeeChatHashTagsProps {
  hashTags: CoffeeChatReservationHashTag[]
}

function CoffeeChatHashTags({ hashTags }: CoffeeChatHashTagsProps) {
  const id = useId()

  return (
    <ul className="w-full flex flex-wrap gap-2">
      {hashTags.map((tag) => (
        <li key={`${id}-${tag.hashtag_id}`}>
          <HashTag className="bg-[#F2F2F2]">{tag.content}</HashTag>
        </li>
      ))}
    </ul>
  )
}

export default CoffeeChatHashTags

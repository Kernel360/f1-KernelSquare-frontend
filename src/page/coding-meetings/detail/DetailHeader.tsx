"use client"

import { DirectionIcons } from "@/components/icons/Icons"
import { CodingMeetingListFilter } from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import { useRouter } from "next/navigation"

function DetailHeader() {
  const { push } = useRouter()

  const viewCodingMeetingList = () => {
    const searchParams = new URLSearchParams()

    searchParams.set("page", "0")
    searchParams.set("size", "10")
    searchParams.set("filter", "all" as CodingMeetingListFilter)

    push(`/coding-meetings?${searchParams.toString()}`)
  }

  return (
    <div className="w-full flex gap-1 items-center">
      <DirectionIcons.LeftLine
        className="text-[28px] text-[#828282] cursor-pointer"
        onClick={viewCodingMeetingList}
      />
      <span className="font-semibold text-[#828282]">목록 보기</span>
    </div>
  )
}

export default DetailHeader

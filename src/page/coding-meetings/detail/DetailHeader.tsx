"use client"

import { DirectionIcons } from "@/components/icons/Icons"
import { getCodingMeetingsTargetHistory } from "@/util/historySession/coding-meetings"
import { useRouter } from "next/navigation"

function DetailHeader() {
  const { push } = useRouter()

  const viewCodingMeetingList = () => {
    const searchParams = new URLSearchParams()

    const codingMeetingsTargetHistory = getCodingMeetingsTargetHistory()

    searchParams.set("page", `${codingMeetingsTargetHistory.page}`)
    searchParams.set("size", `${codingMeetingsTargetHistory.size}`)
    searchParams.set("filter", codingMeetingsTargetHistory.filter)

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

function validPageSearchParams(pageSearchParam: string) {
  const pageNumber = Number(pageSearchParam)

  return (
    !Number.isNaN(pageNumber) &&
    pageNumber > 0 &&
    !pageSearchParam.includes(".")
  )
}

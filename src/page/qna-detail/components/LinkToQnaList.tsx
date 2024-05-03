"use client"

import { DirectionIcons } from "@/components/icons/Icons"
import { getHistorySessionPath } from "@/util/historySession/path"
import { useRouter } from "next/navigation"

function LinkToQnaList() {
  const { push } = useRouter()

  const viewQnAList = () => {
    const historySession = getHistorySessionPath()

    if (!historySession) {
      push("/qna?page=0")
      return
    }

    const prevURL = new URL(
      historySession.prevPath ?? "/",
      process.env.NEXT_PUBLIC_SITE_URL,
    )

    if (!prevURL.pathname.startsWith("/qna")) {
      push("/qna?page=0")
      return
    }

    push(`/qna?${prevURL.searchParams.toString()}`)
  }

  return (
    <div
      className="inline-flex align-top gap-1 items-center p-1 cursor-pointer"
      onClick={viewQnAList}
    >
      <DirectionIcons.LeftLine className="text-[28px] text-[#828282]" />
      <span className="font-semibold text-[#828282]">목록 보기</span>
    </div>
  )
}

export default LinkToQnaList

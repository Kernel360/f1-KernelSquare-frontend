"use client"

import { getHistorySessionPath } from "@/util/historySession/path"
import { useRouter } from "next/navigation"
import { DirectionIcons } from "./icons/Icons"

export type TargetPage = "qna" | "chat"

interface LinkToListPageProps {
  to: TargetPage
}

const initialPath: Record<TargetPage, string> = {
  qna: "/qna?page=0",
  chat: "/chat?page=0",
} as const

const targetPathname: Record<TargetPage, string> = {
  qna: "/qna",
  chat: "/chat",
} as const

function LinkToListPage({ to }: LinkToListPageProps) {
  const { push } = useRouter()

  const viewList = () => {
    const historySession = getHistorySessionPath()

    if (!historySession) {
      push(initialPath[to])
      return
    }

    const prevURL = new URL(
      historySession.prevPath ?? "/",
      process.env.NEXT_PUBLIC_SITE_URL,
    )

    if (!prevURL.pathname.startsWith(targetPathname[to])) {
      push(initialPath[to])
      return
    }

    push(`${targetPathname[to]}?${prevURL.searchParams.toString()}`)
  }

  return (
    <div
      className="inline-flex align-top gap-1 items-center p-1 cursor-pointer"
      onClick={viewList}
    >
      <DirectionIcons.LeftLine className="text-[28px] text-[#828282]" />
      <span className="font-semibold text-[#828282]">목록 보기</span>
    </div>
  )
}

export default LinkToListPage

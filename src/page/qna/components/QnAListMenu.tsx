"use client"

import { useClientSession } from "@/hooks/useClientSession"
import AskQuestionButton from "./AskQuestionButton"

function QnAListMenu() {
  const { user } = useClientSession()

  if (user) return <AskQuestionButton />

  return (
    <div className="bg-info rounded-lg px-2 py-1 text-sm">
      로그인 후 질문 작성이 가능합니다
    </div>
  )
}

export default QnAListMenu

"use client"

import dynamic from "next/dynamic"
import CoffeeChatSection from "./CoffeeChatSection"
import { useRef } from "react"
import { Editor } from "@toast-ui/react-editor"
import { useClientSession } from "@/hooks/useClientSession"

const MdEditor = dynamic(() => import("./MdEditor"), {
  ssr: false,
})

const IntroductionSection = () => {
  const { user } = useClientSession()
  const editorRef = useRef<Editor>(null)

  if (!user) return <div>입력 권한 없음</div>

  return (
    <CoffeeChatSection>
      <CoffeeChatSection.Label htmlFor="content">
        소개글
      </CoffeeChatSection.Label>
      <div className="relative mt-3">
        <MdEditor previous="" editorRef={editorRef} userId={user?.member_id} />
      </div>
    </CoffeeChatSection>
  )
}

export default IntroductionSection

"use client"

import CoffeeChatSection from "../../CoffeeChatSection"
import TextCounter from "@/components/shared/TextCounter"
import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { useCoffeeChatFormContext } from "@/page/coffee-chat/hooks/useCoffeeChatFormContext"
import dynamic from "next/dynamic"
import { useController } from "react-hook-form"

const ContentEditor = dynamic(() => import("./ContentEditor"), {
  ssr: false,
})

function CoffeeChatContentSection() {
  return (
    <CoffeeChatSection>
      <CoffeeChatSection.Label htmlFor="content">
        소개글
      </CoffeeChatSection.Label>
      <div className="relative mt-3">
        <div className="text-base text-left">
          <div className="min-h-[340px]">
            <ContentEditor />
          </div>
          <ChatEditorContentCounter />
        </div>
      </div>
    </CoffeeChatSection>
  )
}

export default CoffeeChatContentSection

const ChatEditorContentCounter = () => {
  const { control } = useCoffeeChatFormContext()
  const { field } = useController({ control, name: "content" })

  return (
    <TextCounter
      text={field.value}
      min={COFFEE_CHAT_LIMITS.content.minLength}
      max={COFFEE_CHAT_LIMITS.content.maxLength}
      className="text-lg block text-right h-2 mr-5"
    />
  )
}

"use client"

import { Control, useController } from "react-hook-form"
import CoffeeChatSection from "../../CoffeeChatSection"
import TextCounter from "@/components/shared/TextCounter"
import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { chatContentRules } from "../../../controls/rules/chat-content-rules"
import dynamic from "next/dynamic"
import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"

interface CoffeeChatContentSectionProps {
  control: Control<CoffeeChatFormData, any>
  initialContent?: string
}

const ContentEditor = dynamic(() => import("./ContentEditor"), { ssr: false })

function CoffeeChatContentSection({
  control,
  initialContent,
}: CoffeeChatContentSectionProps) {
  const { field } = useController({
    control,
    name: "content",
    rules: chatContentRules,
  })

  return (
    <CoffeeChatSection>
      <CoffeeChatSection.Label htmlFor="content">
        소개글
      </CoffeeChatSection.Label>
      <div className="relative mt-3">
        <div className="text-base text-left min-h-[300px]">
          <ContentEditor
            initialValue={initialContent ?? ""}
            onChange={field.onChange}
          />
        </div>
        <TextCounter
          text={field.value}
          min={COFFEE_CHAT_LIMITS.content.minLength}
          max={COFFEE_CHAT_LIMITS.content.maxLength}
          className="text-lg block text-right h-2 mr-5"
        />
      </div>
    </CoffeeChatSection>
  )
}

export default CoffeeChatContentSection

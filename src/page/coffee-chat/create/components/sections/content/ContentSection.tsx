"use client"

import { Control, Controller } from "react-hook-form"
import CoffeeChatSection from "../../CoffeeChatSection"
import TextCounter from "@/components/shared/TextCounter"
import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { chatContentRules } from "../../../controls/rules/chat-content-rules"
import dynamic from "next/dynamic"
import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"

interface CoffeeChatContentSectionProps {
  control: Control<CoffeeChatFormData, any>
}

const ContentEditor = dynamic(() => import("./ContentEditor"), { ssr: false })

function CoffeeChatContentSection({ control }: CoffeeChatContentSectionProps) {
  return (
    <CoffeeChatSection>
      <CoffeeChatSection.Label htmlFor="content">
        소개글
      </CoffeeChatSection.Label>
      <Controller
        control={control}
        name="content"
        defaultValue=""
        rules={chatContentRules}
        render={({ field, fieldState }) => {
          return (
            <div className="relative mt-3">
              <div className="text-base text-left min-h-[300px]">
                <ContentEditor onChange={field.onChange} />
              </div>
              <TextCounter
                text={field.value}
                min={COFFEE_CHAT_LIMITS.content.minLength}
                max={COFFEE_CHAT_LIMITS.content.maxLength}
                className="text-lg block text-right h-2 mr-5"
              />
            </div>
          )
        }}
      />
    </CoffeeChatSection>
  )
}

export default CoffeeChatContentSection

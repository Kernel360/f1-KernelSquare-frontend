"use client"

import { CoffeeChatFormData } from "@/interfaces/form"
import { Control, Controller } from "react-hook-form"
import CoffeeChatSection from "../../CoffeeChatSection"
import TextCounter from "@/components/shared/TextCounter"
import Limitation from "@/constants/limitation"
import { chatContentRules } from "../../../controls/rules/chat-content-rules"
import dynamic from "next/dynamic"

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
                min={Limitation.content_limit_under}
                max={Limitation.content_limit_over}
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

import { CoffeeChatFormData } from "@/interfaces/form"
import { Control, Controller } from "react-hook-form"
import CoffeeChatSection from "../../CoffeeChatSection"
import Textarea from "@/components/shared/textarea/Textarea"
import TextCounter from "@/components/shared/TextCounter"
import Limitation from "@/constants/limitation"
import { chatIntroductionRules } from "../../../controls/rules/introduction-rules"

interface IntroductionSectionProps {
  control: Control<CoffeeChatFormData, any>
}

function IntroductionSection({ control }: IntroductionSectionProps) {
  return (
    <Controller
      control={control}
      name="introduction"
      defaultValue=""
      rules={chatIntroductionRules}
      render={({ field, fieldState }) => {
        return (
          <CoffeeChatSection>
            <div className="w-full">
              <Textarea
                ref={field.ref}
                className="resize-none w-full min-h-[100px] border-none outline-none focus:outline-none"
                placeholder="커피챗의 내용이 명확하게 전달되도록 간결하게 요약해주세요. (10자 이상 150자 이하)"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </div>
            <div>
              <TextCounter
                text={field.value}
                min={Limitation.chat_introduction_limit_under}
                max={Limitation.chat_introduction_limit_over}
                className="text-lg block text-right h-2 mb-5"
              />
            </div>
          </CoffeeChatSection>
        )
      }}
    />
  )
}

export default IntroductionSection

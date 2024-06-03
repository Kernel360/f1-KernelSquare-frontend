import { CoffeeChatFormData } from "@/interfaces/form"
import { Control, useController } from "react-hook-form"
import CoffeeChatSection from "../../CoffeeChatSection"
import Textarea from "@/components/shared/textarea/Textarea"
import TextCounter from "@/components/shared/TextCounter"
import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { chatIntroductionRules } from "../../../controls/rules/introduction-rules"

interface IntroductionSectionProps {
  control: Control<CoffeeChatFormData, any>
}

function IntroductionSection({ control }: IntroductionSectionProps) {
  const { field } = useController({
    control,
    name: "introduction",
    rules: chatIntroductionRules,
  })

  const placeholder = `커피챗의 내용이 명확하게 전달되도록 간결하게 요약해주세요. (${COFFEE_CHAT_LIMITS.introduction.minLength}자 이상 ${COFFEE_CHAT_LIMITS.introduction.maxLength}자 이하)`

  return (
    <CoffeeChatSection>
      <div className="w-full">
        <Textarea
          ref={field.ref}
          className="resize-none w-full min-h-[100px] border-none outline-none focus:outline-none"
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      </div>
      <div>
        <TextCounter
          text={field.value}
          min={COFFEE_CHAT_LIMITS.introduction.minLength}
          max={COFFEE_CHAT_LIMITS.introduction.maxLength}
          className="text-lg block text-right h-2 mb-5"
        />
      </div>
    </CoffeeChatSection>
  )
}

export default IntroductionSection

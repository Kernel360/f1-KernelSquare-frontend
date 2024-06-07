import { useController } from "react-hook-form"
import CoffeeChatSection from "../../CoffeeChatSection"
import TextCounter from "@/components/shared/TextCounter"
import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { chatIntroductionRules } from "../../../controls/rules/introduction-rules"
import { useCoffeeChatFormContext } from "@/page/coffee-chat/hooks/useCoffeeChatFormContext"
import AutoResizeTextArea from "@/components/shared/textarea/AutoResizeTextArea"

function IntroductionSection() {
  const { control } = useCoffeeChatFormContext()
  const { field } = useController({
    control,
    name: "introduction",
    rules: chatIntroductionRules,
  })

  const placeholder = `커피챗의 내용이 명확하게 전달되도록 간결하게 요약해주세요. (${COFFEE_CHAT_LIMITS.introduction.minLength}자 이상 ${COFFEE_CHAT_LIMITS.introduction.maxLength}자 이하)`

  return (
    <CoffeeChatSection>
      <div className="w-full">
        <AutoResizeTextArea
          fullWidth
          ref={field.ref}
          value={field.value}
          placeholder={placeholder}
          minRows={1}
          maxRows={8}
          className="border-none outline-none focus:outline-none"
          onChange={field.onChange}
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

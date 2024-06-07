import { Input } from "@/components/shared/input/Input"
import CoffeeChatSection from "../../CoffeeChatSection"
import { useController } from "react-hook-form"
import TextCounter from "@/components/shared/TextCounter"
import { COFFEE_CHAT_LIMITS } from "@/constants/limitation"
import { chatTitleRules } from "../../../controls/rules/chat-title-rules"
import { useCoffeeChatFormContext } from "@/page/coffee-chat/hooks/useCoffeeChatFormContext"

function TitleSection() {
  const { control } = useCoffeeChatFormContext()
  const { field } = useController({
    control,
    name: "title",
    rules: chatTitleRules,
  })

  const placeholder = `제목(${COFFEE_CHAT_LIMITS.title.minLength}자 이상 ${COFFEE_CHAT_LIMITS.title.maxLength}자 이하)`

  return (
    <CoffeeChatSection className="border-transparent p-0">
      <div>
        <Input
          ref={field.ref}
          id="title"
          spellCheck="false"
          autoComplete="off"
          fullWidth
          className={
            "rounded-none border-r-0 border-l-0 border-t-0 py-4 text-xl placeholder:text-xl pc:text-2xl pc:placeholder:text-2xl"
          }
          placeholder={placeholder}
          value={field.value}
          error={
            !!field.value &&
            (field.value.length < COFFEE_CHAT_LIMITS.title.minLength ||
              field.value.length > COFFEE_CHAT_LIMITS.title.maxLength)
          }
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        <TitleTextCounter text={field.value} className="mt-1" />
      </div>
    </CoffeeChatSection>
  )
}

export default TitleSection

const TitleTextCounter = ({
  text,
  className,
}: {
  text: string
  className?: string
}) => {
  return (
    <TextCounter
      text={text}
      min={COFFEE_CHAT_LIMITS.title.minLength}
      max={COFFEE_CHAT_LIMITS.title.maxLength}
      className={className}
    />
  )
}

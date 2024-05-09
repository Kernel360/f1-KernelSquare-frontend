import { Input } from "@/components/shared/input/Input"
import CoffeeChatSection from "../../CoffeeChatSection"
import { CoffeeChatFormData } from "@/interfaces/form"
import { Control, Controller } from "react-hook-form"
import TextCounter from "@/components/shared/TextCounter"
import Limitation from "@/constants/limitation"
import { chatTitleRules } from "../../../controls/rules/chat-title-rules"

interface TitleSectionProps {
  control: Control<CoffeeChatFormData, any>
}

function TitleSection({ control }: TitleSectionProps) {
  return (
    <CoffeeChatSection className="border-transparent p-0">
      <Controller
        control={control}
        name="title"
        rules={chatTitleRules}
        defaultValue=""
        render={({ field, fieldState }) => {
          return (
            <div>
              <Input
                id="title"
                spellCheck="false"
                autoComplete="off"
                fullWidth
                className={
                  "rounded-none border-r-0 border-l-0 border-t-0 py-4 text-xl placeholder:text-xl pc:text-2xl pc:placeholder:text-2xl"
                }
                placeholder="제목(5자 이상 100자 이하)"
                value={field.value}
                error={
                  !!field.value &&
                  (field.value.length < Limitation.title_limit_under ||
                    field.value.length > Limitation.title_limit_over)
                }
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
              <TitleTextCounter text={field.value} className="mt-1" />
            </div>
          )
        }}
      />
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
      min={Limitation.title_limit_under}
      max={Limitation.title_limit_over}
      className={className}
    />
  )
}

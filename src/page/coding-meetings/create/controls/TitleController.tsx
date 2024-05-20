import TextCounter from "@/components/shared/TextCounter"
import { Input } from "@/components/shared/input/Input"
import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import CodingMeetingSection from "../components/CodingMeetingSection"
import Limitation from "@/constants/limitation"
import { codingMeetingTitleRules } from "./rules/title/title-rules"

interface TitleControllerProps {
  initialTitle?: CodingMeetingFormData["title"]
}

function TitleController({ initialTitle }: TitleControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field, fieldState } = useController({
    control,
    name: "title",
    rules: codingMeetingTitleRules,
    defaultValue: initialTitle ?? "",
  })

  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label
        verticalAlign="center"
        htmlFor={field.name}
        className="gap-x-2"
      >
        <span>제목</span>
        <TextCounter
          target={!!field.value}
          text={field.value}
          min={Limitation.title_limit_under}
          max={Limitation.title_limit_over}
        />
      </CodingMeetingSection.Label>
      <div className="w-full">
        <Input
          ref={field.ref}
          name={field.name}
          id={field.name}
          className={"text-base placeholder:text-base"}
          placeholder="제목을 입력해주세요(5자 이상 100자 이하)"
          spellCheck="false"
          autoComplete="off"
          fullWidth
          value={field.value}
          error={!!fieldState.error && fieldState.error.type !== "required"}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      </div>
    </CodingMeetingSection>
  )
}

export default TitleController

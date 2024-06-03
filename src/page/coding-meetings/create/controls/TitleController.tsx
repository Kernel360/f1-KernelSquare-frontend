import TextCounter from "@/components/shared/TextCounter"
import { Input } from "@/components/shared/input/Input"
import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import CodingMeetingSection from "../components/CodingMeetingSection"
import { CODING_MEETING_LIMITS } from "@/constants/limitation"
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

  const placeholder = `제목을 입력해주세요(${CODING_MEETING_LIMITS.title.minLength}자 이상 ${CODING_MEETING_LIMITS.title.maxLength}자 이하)`

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
          min={CODING_MEETING_LIMITS.title.minLength}
          max={CODING_MEETING_LIMITS.title.maxLength}
        />
      </CodingMeetingSection.Label>
      <div className="w-full">
        <Input
          ref={field.ref}
          name={field.name}
          id={field.name}
          className={"text-base placeholder:text-base"}
          placeholder={placeholder}
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

import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import QuestionSection from "../../QuestionSection"
import { useController } from "react-hook-form"
import { Input } from "@/components/shared/input/Input"
import { questionTitleRules } from "./question-title-rules"
import TextCounter from "@/components/shared/TextCounter"
import { QUESTION_LIMITS } from "@/constants/limitation"

function QuestionTitleSection() {
  const { control } = useQuestionFormContext()
  const { field, fieldState } = useController({
    control,
    name: "title",
    rules: questionTitleRules,
  })

  return (
    <QuestionSection className="py-0">
      <Input
        ref={field.ref}
        fullWidth
        className="rounded-none border-r-0 border-l-0 border-t-0 text-2xl placeholder:text-base sm:placeholder:text-2xl py-4"
        placeholder={`제목을 입력해주세요 (${QUESTION_LIMITS.title.minLength}자 이상 ${QUESTION_LIMITS.title.maxLength}자 이하)`}
        spellCheck="false"
        autoComplete="off"
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={!!fieldState.error}
        value={field.value}
      />
      <div className="flex w-full min-h-[20px]">
        <TextCounter
          target={!!field.value}
          text={field.value}
          min={QUESTION_LIMITS.title.minLength}
          max={QUESTION_LIMITS.title.maxLength}
        />
      </div>
    </QuestionSection>
  )
}

export default QuestionTitleSection

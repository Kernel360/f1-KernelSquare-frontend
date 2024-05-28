import { useQuestionFormContext } from "@/page/askQuestion/hooks/useQuestionFormContext"
import QuestionSection from "../../QuestionSection"
import PaginationSkills from "./PaginationSkills"
import SummarizedSelectedSkills from "./SummarizedSelectedSkills"
import Spacing from "@/components/shared/Spacing"
import { QUESTION_LIMITS } from "@/constants/limitation"
import SearchSkill from "./search/SearchSkill"

function QuestionSkillSection() {
  return (
    <QuestionSection className="overflow-x-hidden">
      <QuestionSection.Label className="inline-flex align-top gap-x-1 mb-4 sm:mb-[26px]">
        기술 스택
        <SelectedSkillCount />
      </QuestionSection.Label>
      <SummarizedSelectedSkills />
      <Spacing size={16} />
      <SearchSkill />
      <Spacing size={12} />
      <PaginationSkills />
    </QuestionSection>
  )
}

export default QuestionSkillSection

const SelectedSkillCount = () => {
  const { skillFieldArray } = useQuestionFormContext()

  return (
    <div className="inline-flex align-top items-center">
      <span>&#40;&nbsp;</span>
      <span
        className={`${
          skillFieldArray.fields.length > QUESTION_LIMITS.skill.maxLength
            ? "text-danger"
            : "text-primary"
        }`}
      >
        {skillFieldArray.fields.length}
      </span>
      <span>&nbsp;/&nbsp;</span>
      <span>{QUESTION_LIMITS.skill.maxLength}</span>
      <span>&nbsp;&#41;&nbsp;</span>
    </div>
  )
}

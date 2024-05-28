"use client"

import { QuestionFormData } from "@/interfaces/form/question-form"
import {
  Control,
  useController,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import { questionSkillFieldArrayRules } from "../components/fields/skill/question-skills-rules"

interface UseQuestionSkillFieldArray {
  control?: Control<QuestionFormData, any>
}

export function useQuestionSkillFieldArray({
  control,
}: UseQuestionSkillFieldArray = {}) {
  const { control: contextControl } = useFormContext<QuestionFormData>()
  const { field } = useController({
    control: control ?? contextControl,
    name: "skills",
    rules: questionSkillFieldArrayRules,
  })
  const { fields, ...fieldArray } = useFieldArray({
    control: control ?? contextControl,
    name: "skills",
    rules: questionSkillFieldArrayRules,
  })

  return {
    fields: field.value,
    ...fieldArray,
  }
}

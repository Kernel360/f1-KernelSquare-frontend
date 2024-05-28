import SelectableTags, {
  SelectableTagsProps,
} from "@/components/shared/tag/SelectableTags"
import { Skill } from "@/interfaces/form/question-form"

interface SelectableSkillsProps
  extends Omit<SelectableTagsProps<Skill, "skill">, "tags" | "tagKey"> {
  skills: Skill[]
}

function SelectableSkills({
  skills,
  isSelected,
  onSelect,
  className,
  highlightKeyword,
}: SelectableSkillsProps) {
  return (
    <SelectableTags<Skill, "skill">
      tags={skills.map((skill) => ({ label: skill, value: skill }))}
      tagKey="skill"
      onSelect={onSelect}
      isSelected={isSelected}
      className={className}
      highlightKeyword={highlightKeyword}
    />
  )
}

export default SelectableSkills

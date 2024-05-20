import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import { memberCountRules } from "./rules/member-count/member-count-rules"
import { CODING_MEETING_LIMITS } from "@/constants/limitation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { useId } from "react"

interface MemberCountControllerProps {
  initialMemberCount?: CodingMeetingFormData["member_upper_limit"]
}

function MemberCountController({
  initialMemberCount,
}: MemberCountControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "member_upper_limit",
    rules: memberCountRules,
    defaultValue: initialMemberCount,
  })

  const id = useId()

  const onValueChange = (countFormat: string) => {
    field.onChange(Number(countFormat))
  }

  return (
    <div>
      <div className="text-slate-500 text-sm mb-2">
        본인 포함 최대 6명까지 가능합니다.
      </div>
      <Select
        onValueChange={onValueChange}
        value={field.value ? `${field.value}` : undefined}
      >
        <SelectTrigger
          id="meeting-member-count"
          ref={field.ref}
          className="w-full sm:w-[224px]"
        >
          <SelectValue
            placeholder={
              <span className={"text-[#828282]"}>인원 수를 선택해주세요</span>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {memberCountOptions.map((memberCount) => {
            return (
              <SelectItem key={`${id}-${memberCount}`} value={`${memberCount}`}>
                {memberCount}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default MemberCountController

const memberCountOptions = Array.from({
  length:
    CODING_MEETING_LIMITS.memberCount.max -
    CODING_MEETING_LIMITS.memberCount.min +
    1,
}).map((_, index) => {
  return CODING_MEETING_LIMITS.memberCount.min + index
})

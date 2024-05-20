"use client"

import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import { useId } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { CODING_MEETING_MINUTES } from "@/constants/timeOptions"
import { codingMeetingEndMinuteRules } from "../rules/date/end-time/coding-meeting-end-minute-rules"

interface CodingMeetingEndMinuteControllerProps {
  initialEndMinute?: CodingMeetingFormData["date"]["end_time"][1]
}

function CodingMeetingEndMinuteController({
  initialEndMinute,
}: CodingMeetingEndMinuteControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "date.end_time.1",
    rules: codingMeetingEndMinuteRules,
    defaultValue: initialEndMinute,
  })

  const seperatorId = useId()

  return (
    <Select
      onValueChange={(value) => field.onChange(value)}
      value={field.value ?? undefined}
    >
      <SelectTrigger ref={field.ref} className="w-[145px] pc:w-[132px]">
        <SelectValue
          placeholder={<span className={"text-[#828282]"}>분 선택</span>}
        />
      </SelectTrigger>
      <SelectContent>
        {CODING_MEETING_MINUTES.map((minute) => {
          return (
            <SelectItem
              key={`${seperatorId}-endMinute-${minute}`}
              value={minute}
            >
              {minute}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default CodingMeetingEndMinuteController

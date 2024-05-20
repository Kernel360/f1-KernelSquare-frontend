"use client"

import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import { codingMeetingStartMinuteRules } from "../rules/date/start-time/coding-meeting-start-minute-rules"
import { useId } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { CODING_MEETING_MINUTES } from "@/constants/timeOptions"

interface CodingMeetingStartMinuteControllerProps {
  initialStartMinute?: CodingMeetingFormData["date"]["start_time"][1]
}

function CodingMeetingStartMinuteController({
  initialStartMinute,
}: CodingMeetingStartMinuteControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "date.start_time.1",
    rules: codingMeetingStartMinuteRules,
    defaultValue: initialStartMinute,
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
              key={`${seperatorId}-startMinute-${minute}`}
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

export default CodingMeetingStartMinuteController

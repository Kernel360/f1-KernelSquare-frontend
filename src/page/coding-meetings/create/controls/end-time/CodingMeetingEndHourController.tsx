"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/Select"
import { CODING_MEETING_HOURS } from "@/constants/timeOptions"
import { CodingMeetingFormData } from "@/interfaces/form"
import { SelectValue } from "@radix-ui/react-select"
import { useId } from "react"
import { useController, useFormContext } from "react-hook-form"
import { codingMeetingEndHourRules } from "../rules/date/end-time/coding-meeting-end-hour-rules"

interface CodingMeetingEndHourControllerProps {
  initialEndHour?: CodingMeetingFormData["date"]["end_time"][0]
}

function CodingMeetingEndHourController({
  initialEndHour,
}: CodingMeetingEndHourControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "date.end_time.0",
    rules: codingMeetingEndHourRules,
    defaultValue: initialEndHour,
  })

  const seperatorId = useId()

  return (
    <Select
      onValueChange={(value) => field.onChange(value)}
      value={field.value ?? undefined}
    >
      <SelectTrigger ref={field.ref} className="w-[145px] pc:w-[132px]">
        <SelectValue
          placeholder={<span className={"text-[#828282]"}>시간 선택</span>}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="px-0 text-center">오전(AM)</SelectLabel>
          {CODING_MEETING_HOURS.AM.map((am_hours) => {
            return (
              <SelectItem
                key={`${seperatorId}-endAM-${am_hours}`}
                value={am_hours}
              >
                {am_hours}
              </SelectItem>
            )
          })}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel className="px-0 text-center">오후(PM)</SelectLabel>
          {CODING_MEETING_HOURS.PM.map((pm_hours) => {
            return (
              <SelectItem
                key={`${seperatorId}-endPM-${pm_hours}`}
                value={pm_hours}
              >
                {pm_hours}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CodingMeetingEndHourController

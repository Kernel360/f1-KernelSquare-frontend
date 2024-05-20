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
import { codingMeetingStartHourRules } from "../rules/date/start-time/coding-meeting-start-hour-rules"

interface CodingMeetingStartHourControllerProps {
  initialStartHour?: CodingMeetingFormData["date"]["start_time"][0]
}

function CodingMeetingStartHourController({
  initialStartHour,
}: CodingMeetingStartHourControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "date.start_time.0",
    rules: codingMeetingStartHourRules,
    defaultValue: initialStartHour,
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
                key={`${seperatorId}-startAM-${am_hours}`}
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
                key={`${seperatorId}-startPM-${pm_hours}`}
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

export default CodingMeetingStartHourController

"use client"

import { useState } from "react"
import CodingMeetingSection from "./CodingMeetingSection"
import CustomCalendar from "./CustomCalendar/CustomCalendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { timeSelect } from "@/constants/timeOptions"
import { Value } from "@/interfaces/calendar"
import { SetterOrUpdater, useRecoilState } from "recoil"
import {
  CodingMeetingDay,
  EndTime,
  StartTime,
  type Time,
} from "@/recoil/atoms/coding-meeting/dateTime"

const DateTimeSection = () => {
  const [date, setDate] = useRecoilState(CodingMeetingDay)

  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label className="block w-max">
        일 시
      </CodingMeetingSection.Label>
      <div className="flex flex-wrap gap-10 w-full items-start">
        <div>
          <div className="font-bold">날짜</div>
          <CustomCalendar date={date} setDate={setDate} />
        </div>
        <div>
          <div className="flex flex-col gap-5">
            <div className="font-bold">시간</div>
            <StartBox />
            <EndBox />
          </div>
        </div>
      </div>
    </CodingMeetingSection>
  )
}

export default DateTimeSection

const TimeBox = ({ timeState, setTimeState, suffix }: any) => {
  const handleTimeChange = (
    type: "range" | "hour" | "minute",
    value: string,
  ) => {
    setTimeState({ ...timeState, [type]: value })
  }

  return (
    <div className="flex items-center gap-2">
      <SelectBox
        targetArray={timeSelect.range}
        placeholder="구분"
        handler={(value: string) => handleTimeChange("range", value)}
      />
      <div>
        <SelectBox
          targetArray={timeSelect.hours}
          placeholder="시간"
          handler={(value: string) => handleTimeChange("hour", value)}
        />
      </div>
      <div>:</div>
      <div>
        <SelectBox
          targetArray={timeSelect.minutes}
          placeholder="분"
          handler={(value: string) => handleTimeChange("minute", value)}
        />
      </div>
      <div>{suffix}</div>
    </div>
  )
}

const StartBox = () => {
  const [startTime, setStartTime] = useRecoilState(StartTime)
  return (
    <TimeBox timeState={startTime} setTimeState={setStartTime} suffix="부터" />
  )
}

const EndBox = () => {
  const [endTime, setEndTime] = useRecoilState(EndTime)
  return <TimeBox timeState={endTime} setTimeState={setEndTime} suffix="까지" />
}

type SelectBoxProps = {
  targetArray: string[]
  placeholder: "구분" | "시간" | "분"
  handler: (value: string) => void
}

const SelectBox = ({ targetArray, placeholder, handler }: SelectBoxProps) => {
  return (
    <Select onValueChange={(value: string) => handler(value)}>
      <SelectTrigger className="w-[100px] text-center">
        <SelectValue className="flex flex-1" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {targetArray.map((val) => (
          <SelectItem value={val} key={val}>
            {val}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

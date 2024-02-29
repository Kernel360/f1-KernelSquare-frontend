"use client"

import { useLayoutEffect } from "react"
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
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  CodingMeetingDay,
  EndTime,
  StartTime,
} from "@/recoil/atoms/coding-meeting/dateTime"
import type {
  DateTimeSectionProps,
  SelectBoxProps,
  TimeBoxProps,
} from "../CreateCodingMeetingPage.types"
import dayjs from "dayjs"

const DateTimeSection = ({ initialDateTime }: DateTimeSectionProps) => {
  const [date, setDate] = useRecoilState(CodingMeetingDay)
  const setStartTime = useSetRecoilState(StartTime)
  const setEndTime = useSetRecoilState(EndTime)

  useLayoutEffect(() => {
    if (initialDateTime) {
      const initialDate = dayjs(
        initialDateTime.coding_meeting_start_time,
      ).format("YYYY-MM-DD")
      const start = dayjs(initialDateTime.coding_meeting_start_time)
      const end = dayjs(initialDateTime.coding_meeting_end_time)
      setDate(new Date(initialDate))
      setStartTime({
        range: start.format("a"),
        hour:
          (start.get("hour") > 12
            ? start.subtract(12, "hour").get("hour")
            : start.get("hour")) + "",
        minute: start.get("minute") + "",
      })
      setEndTime({
        range: end.format("a"),
        hour:
          (end.get("hour") > 12
            ? end.subtract(12, "hour").get("hour")
            : end.get("hour")) + "",
        minute:
          String(end.get("minute")).length === 1
            ? "0" + String(end.get("minute"))
            : end.get("minute") + "",
      })
    }
  }, [])

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

const TimeBox = ({ timeState, setTimeState, suffix }: TimeBoxProps) => {
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
        defaultValue={timeState.range}
      />
      <div>
        <SelectBox
          targetArray={timeSelect.hours}
          placeholder="시간"
          handler={(value: string) => handleTimeChange("hour", value)}
          defaultValue={timeState.hour}
        />
      </div>
      <div>:</div>
      <div>
        <SelectBox
          targetArray={timeSelect.minutes}
          placeholder="분"
          handler={(value: string) => handleTimeChange("minute", value)}
          defaultValue={timeState.minute}
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

const SelectBox = ({
  targetArray,
  placeholder,
  handler,
  defaultValue,
}: SelectBoxProps) => {
  return (
    <Select onValueChange={(value: string) => handler(value)}>
      <SelectTrigger className="w-[100px] text-center">
        <SelectValue
          className="flex flex-1"
          placeholder={defaultValue ? defaultValue : placeholder}
          defaultValue={defaultValue}
        />
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

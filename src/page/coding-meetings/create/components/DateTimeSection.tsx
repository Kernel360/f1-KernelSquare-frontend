"use client"

import { useState } from "react"
import CodingMeetingSection from "./CodingMeetingSection"
import { Value } from "./CustomCalendar/Calendar.types"
import CustomCalendar from "./CustomCalendar/CustomCalendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Input } from "@/components/shared/input/Input"

const DateTimeSection = () => {
  const [date, setDate] = useState<Value>(new Date())

  const hours = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]
  const minutes = ["00", "30"]

  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label className="block w-max">
        일 시
      </CodingMeetingSection.Label>
      <div className="">
        <CustomCalendar date={date} setDate={setDate} />
        <div className="flex gap-2 mt-5 items-center">
          <div className="font-bold mr-5">시간</div>
          <Select defaultValue={"AM"}>
            <SelectTrigger className="w-[80px] text-center">
              <SelectValue className="flex flex-1">{}</SelectValue>
            </SelectTrigger>
            <SelectContent className="w-[80px]">
              {["AM", "PM"].map((val) => (
                <SelectItem value={val} key={val} className="w-full">
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Input className="rounded-none border-r-0 border-l-0 border-t-0 text-xl w-[100px]" />
          </div>
          <div>시</div>
          <div>
            <Input className="rounded-none border-r-0 border-l-0 border-t-0 text-xl w-[100px]" />
          </div>
          <div>분</div>
          <div>~</div>
          <div>
            <Input className="rounded-none border-r-0 border-l-0 border-t-0 text-xl w-[100px]" />
          </div>
          <div>시</div>
          <div>
            <Input className="rounded-none border-r-0 border-l-0 border-t-0 text-xl w-[100px]" />
          </div>
          <div>분</div>
        </div>
      </div>
    </CodingMeetingSection>
  )
}

export default DateTimeSection

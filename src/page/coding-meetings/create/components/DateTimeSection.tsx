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

const DateTimeSection = () => {
  const [date, setDate] = useState<Value>(new Date())

  const range = ["오전", "오후"]
  const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  const minutes = ["00", "30"]

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
            <div className="flex items-center gap-2">
              <SelectBox targetArray={range} placeholder="구분" />
              <div>
                <SelectBox targetArray={hours} placeholder="시간" />
              </div>
              <div>:</div>
              <div>
                <SelectBox targetArray={minutes} placeholder="분" />
              </div>
              <div>부터</div>
            </div>
            <div className="flex items-center gap-2">
              <SelectBox targetArray={range} placeholder="구분" />
              <div>
                <SelectBox targetArray={hours} placeholder="시간" />
              </div>
              <div>:</div>
              <div>
                <SelectBox targetArray={minutes} placeholder="분" />
              </div>
              <div>까지</div>
            </div>
          </div>
        </div>
      </div>
    </CodingMeetingSection>
  )
}

export default DateTimeSection

type SelectBoxProps = {
  targetArray: string[]
  placeholder: string
}

const SelectBox = ({ targetArray, placeholder }: SelectBoxProps) => {
  return (
    <Select>
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

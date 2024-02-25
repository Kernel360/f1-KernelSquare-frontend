"use client"

import { useRecoilState } from "recoil"
import CodingMeetingSection from "./CodingMeetingSection"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { CodingMeetingHeadCount } from "@/recoil/atoms/coding-meeting/headcount"

const HeadCountValue = ["3", "4", "5", "6"]

const HeadCountSection = () => {
  const [headCount, setHeadCount] = useRecoilState(CodingMeetingHeadCount)
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label className="block w-max mb-5">
        인 원
      </CodingMeetingSection.Label>
      <Select
        onValueChange={(cnt: string) => {
          setHeadCount(cnt)
        }}
        defaultValue={HeadCountValue[0]}
      >
        <SelectTrigger className="w-[180px] text-center">
          <SelectValue className="flex flex-1">{headCount}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {HeadCountValue.map((cnt) => (
            <SelectItem value={cnt} key={cnt}>
              {cnt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CodingMeetingSection>
  )
}

export default HeadCountSection

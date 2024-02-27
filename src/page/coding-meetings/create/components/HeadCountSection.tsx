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
        모집인원
      </CodingMeetingSection.Label>
      <div className="w-full">
        <div className="text-slate-500 mb-2">
          본인 포함 최대 6명까지 가능합니다.
        </div>
        <Select
          onValueChange={(cnt: string) => {
            setHeadCount(cnt)
          }}
        >
          <SelectTrigger className="w-[224px] text-center">
            <SelectValue
              className="flex flex-1"
              placeholder="인원 수를 선택해주세요"
            />
          </SelectTrigger>
          <SelectContent>
            {HeadCountValue.map((cnt) => (
              <SelectItem value={cnt} key={cnt}>
                {cnt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CodingMeetingSection>
  )
}

export default HeadCountSection

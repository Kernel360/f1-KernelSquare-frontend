"use client"

import { useSetRecoilState } from "recoil"
import CodingMeetingSection from "./CodingMeetingSection"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { CodingMeetingHeadCount } from "@/recoil/atoms/coding-meeting/headcount"
import { HeadCountValue } from "@/constants/select"
import { useLayoutEffect } from "react"
import type { HeadCountSectionProps } from "../CreateCodingMeetingPage.types"

const HeadCountSection = ({ initialCnt }: HeadCountSectionProps) => {
  const setHeadCount = useSetRecoilState(CodingMeetingHeadCount)

  useLayoutEffect(() => {
    if (initialCnt) setHeadCount(initialCnt)
    else setHeadCount("0")
  }, [])

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
              defaultValue={initialCnt ? initialCnt : undefined}
              placeholder={initialCnt ? initialCnt : "인원 수를 선택해주세요"}
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

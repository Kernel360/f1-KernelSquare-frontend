"use client"

import { Input } from "@/components/shared/input/Input"
import CodingMeetingSection from "./CodingMeetingSection"
import KakaoMap from "./CustomMap/kakaoMap"
import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"

const LocationSection = () => {
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label>위치</CodingMeetingSection.Label>
      <div className="w-full">
        {/* <Input
          id="title"
          spellCheck="false"
          autoComplete="off"
          fullWidth
          className="text-base placeholder:text-base"
          placeholder="위치를 검색해주세요"
        /> */}
        <Button buttonTheme="secondary" className="p-3 w-[224px]">
          <Icons.Search className="mr-3" /> 위치를 검색해주세요
        </Button>
        {/* <div className="w-96 h-96 bg-slate-200 mt-5"><KakaoMap /></div> */}
      </div>
    </CodingMeetingSection>
  )
}

export default LocationSection

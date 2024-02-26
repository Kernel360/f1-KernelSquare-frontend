"use client"

import { Input } from "@/components/shared/input/Input"
import CodingMeetingSection from "./CodingMeetingSection"
import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import KakaoMapPage from "./CustomMap/kakaoMap"
import { useForm } from "react-hook-form"
import { useState } from "react"

const LocationSection = () => {
  return (
    <CodingMeetingSection>
      <CodingMeetingSection.Label>위치</CodingMeetingSection.Label>
      <div className="w-full">
        <LocationDialog />
      </div>
    </CodingMeetingSection>
  )
}

export default LocationSection

const LocationDialog = () => {
  const [keyword, setKeyword] = useState<string>("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button buttonTheme="secondary" className="p-3 w-[224px]">
          <Icons.Search className="mr-1 scale-x-[-1]" /> 위치를 검색해주세요
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[48rem] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            장소 검색하기
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center">
              <Input
                id="title"
                spellCheck="false"
                autoComplete="off"
                fullWidth
                className="text-base placeholder:text-base my-5 px-5 mr-5"
                placeholder="위치를 검색해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                type="button"
                buttonTheme="primary"
                className="p-3 w-[80px] mx-2"
              >
                검색
              </Button>
              <Button
                type="button"
                buttonTheme="third"
                className="p-3 w-[80px] hover:bg-white"
              >
                초기화
              </Button>
            </div>
            <div className="flex gap-5 -center mb-5">
              <div className="w-[40%] border-[1px] border-gray-200">
                장소 목록
              </div>
              <KakaoMapPage keyword={keyword} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="submit" buttonTheme="secondary" className="p-3">
              장소 선택
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

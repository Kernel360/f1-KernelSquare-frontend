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
import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import {
  CodingMeetingMapData,
  LocationForSubmit,
  SearchMapMarker,
  SelectedPlace,
} from "@/recoil/atoms/coding-meeting/mapData"
import { twJoin } from "tailwind-merge"

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
  const [mapData, setMapData] = useRecoilState(CodingMeetingMapData)
  const [selectedPlace, setSelectedPlace] = useRecoilState(SelectedPlace)
  const setMarkers = useSetRecoilState(SearchMapMarker)
  const [location, setLocation] = useRecoilState(LocationForSubmit)

  const resetHistory = () => {
    setKeyword("")
    setMapData(undefined)
    setMarkers(undefined)
    setLocation(undefined)
    setSelectedPlace(undefined)
  }

  useEffect(() => {
    if (!selectedPlace) return
    const element = document.getElementById(selectedPlace?.content)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedPlace])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center">
          {location && (
            <div className="mr-5">
              {location.coding_meeting_location_place_name}
            </div>
          )}
          <div>
            <Button
              buttonTheme="secondary"
              className="p-3 w-[224px]"
              onClick={resetHistory}
            >
              <Icons.Search className="mr-1 scale-x-[-1]" />
              {location ? "위치 바꾸기" : "위치를 검색해주세요"}
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[48rem] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            <div className="text-2xl font-bold text-center">장소 검색하기</div>
            <div className="text-md text-center text-slate-400 font-light mt-3">
              검색어를 입력하면 실시간으로 관련 장소를 확인해볼 수 있어요
            </div>
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
                ghost
                className="ml-5 p-3 w-[80px] hover:text-primary"
                onClick={resetHistory}
              >
                초기화
              </Button>
            </div>
            <div className="flex gap-5 -center mb-5">
              <div className="w-[40%] border-[1px] border-gray-200 max-h-[300px] overflow-scroll">
                {mapData &&
                  mapData.map((place) => (
                    <div
                      key={place.id}
                      className="mb-3 border-b-[1px] border-b-slate-300 p-3 mx-2 last:border-b-0"
                      id={place.place_name}
                    >
                      <div
                        className="font-bold mb-2 cursor-pointer hover:text-primary"
                        onClick={() => {
                          window.open(place.place_url)
                        }}
                      >
                        {place.place_name}
                      </div>
                      <div className="flex justify-between">
                        <div className="text-slate-400">
                          {place.address_name}
                        </div>
                        <div>
                          <Button
                            type="button"
                            buttonTheme={
                              place.place_name ===
                              location?.coding_meeting_location_place_name
                                ? "primary"
                                : "third"
                            }
                            className="ml-5 p-1 w-[40px] hover:text-white"
                            onClick={() =>
                              setLocation({
                                coding_meeting_location_id: place.id,
                                coding_meeting_location_place_name:
                                  place.place_name,
                                coding_meeting_location_latitude: place.x,
                                coding_meeting_location_longitude: place.y,
                              })
                            }
                          >
                            선택
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
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

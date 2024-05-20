"use client"

import { Icons } from "@/components/icons/Icons"
import { SearchPlaceResultData } from "@/recoil/atoms/coding-meeting/mapData"
import { StaticMap } from "react-kakao-maps-sdk"
import { useRecoilValue } from "recoil"
import Button from "@/components/shared/button/Button"
import { ErrorBoundary } from "react-error-boundary"
import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import useModal from "@/hooks/useModal"
import { locationRules } from "../../../controls/rules/location/location-rules"

function SearchResultPlaceMaps() {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "location",
    rules: locationRules,
  })

  const searchPlaceResultData = useRecoilValue(SearchPlaceResultData)

  const { closeModal } = useModal()

  if (
    searchPlaceResultData.keyword &&
    !searchPlaceResultData?.placeList?.length
  ) {
    return (
      <div className="w-full bg-white border border-colorsGray rounded-md">
        <div className="w-full h-[120px] flex justify-center items-center">
          <Icons.MapMarker className="text-3xl text-colorsGray" />
        </div>
        <div className="w-full px-2 py-1">
          <div className="inline-flex align-top text-sm">
            <span className="text-danger">&apos;</span>
            <span className="inline-block align-top text-danger whitespace-nowrap overflow-hidden text-ellipsis max-w-[154px]">
              {searchPlaceResultData.keyword}
            </span>
            <span className="text-danger">&apos;</span>
          </div>
          <span className="text-sm align-top">
            검색어와 일치하는 장소를 찾을 수 없습니다.
          </span>
        </div>
      </div>
    )
  }

  return (
    <ul>
      {searchPlaceResultData.placeList.map((place) => {
        return (
          <li
            key={place.id}
            className="[&:not(:last-child)]:mb-6 w-full bg-white border border-colorsGray rounded-md"
          >
            <div className="w-full overflow-hidden">
              <ErrorBoundary
                fallback={
                  <div className="w-full h-[120px]">
                    <div className="absolute left-0 top-0 z-[2] w-full h-full flex flex-col justify-center items-center bg-white">
                      <div className="w-8 h-8 flex justify-center items-center rounded-full border border-[#828282]">
                        <Icons.MapMarker className="text-[#828282]" />
                      </div>
                      <div className="mt-5 text-sm text-[#828282]">
                        카카오 맵 로드 실패
                      </div>
                    </div>
                  </div>
                }
              >
                <StaticMap
                  style={{
                    width: "100%",
                    height: "120px",
                  }}
                  center={{ lng: Number(place.x), lat: Number(place.y) }}
                  marker={{
                    position: { lng: Number(place.x), lat: Number(place.y) },
                  }}
                  level={3}
                />
              </ErrorBoundary>
            </div>
            <div className="flex w-full gap-x-6 justify-between px-2 py-1">
              <div className="basis-0 flex-1">
                <span className="font-bold block">{place.place_name}</span>
                <span className="text-xs text-colorsDarkGray font-medium">
                  {place.address_name}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  buttonTheme="primary"
                  className="px-6"
                  onClick={() => {
                    field.onChange({
                      id: place.id,
                      longitude: place.x,
                      latitude: place.y,
                      place_name: place.place_name,
                    } as CodingMeetingFormData["location"])

                    closeModal()
                  }}
                >
                  선택
                </Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SearchResultPlaceMaps

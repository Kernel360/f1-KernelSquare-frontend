"use client"

import { PlaceAutoComplete } from "@/recoil/atoms/coding-meeting/mapData"
import { useRecoilValue } from "recoil"
import HighlightPlaceName from "./HighlightPlaceName"
import React from "react"

interface AutoCompleteProps {
  onPlaceClick?: (payload: {
    event: React.MouseEvent<HTMLLIElement>
    place: kakao.maps.services.PlacesSearchResultItem
  }) => void
}

function AutoComplete({ onPlaceClick }: AutoCompleteProps) {
  const { keyword, loading, placeList } = useRecoilValue(PlaceAutoComplete)

  if (!keyword) {
    return <div className="text-sm py-4">검색어를 입력해 주세요</div>
  }

  if (loading) return <div className="text-sm py-4">잠시만 기다려주세요</div>

  if (!placeList?.length)
    return (
      <div className="text-sm py-4">
        <span className="text-danger font-semibold inline-block align-top overflow-hidden text-ellipsis max-w-[12em] whitespace-nowrap">
          {keyword}
        </span>{" "}
        검색어와 일치하는 장소를 찾지 못했어요.
      </div>
    )

  return (
    <ul
      id="location-autocomplete-wrapper"
      className="max-h-[224px] overflow-x-hidden overflow-y-auto"
    >
      {placeList.map((place) => {
        const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
          onPlaceClick && onPlaceClick({ event: e, place })
        }

        return (
          <li
            key={place.id}
            className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-colorsGray flex flex-col w-full break-all py-4 justify-center bg-white pointerhover:hover:bg-light-green pointerhover:hover:cursor-pointer"
            onClick={onClick}
          >
            <HighlightPlaceName
              placeName={place.place_name}
              typedKeyword={keyword}
            />
            <span className="text-xs font-medium">{place.address_name}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default AutoComplete

AutoComplete.Wrapper = function AutoCompleteWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const placeAutoComplete = useRecoilValue(PlaceAutoComplete)

  return placeAutoComplete.open ? (
    <div className="absolute w-full p-2 bg-white rounded-bl-2xl rounded-br-2xl left-0 top-full border-t border-t-colorsGray shadow-[0_5px_2px_0_rgba(0,0,0,.05),0_5px_8px_0_rgba(0,0,0,.08)]">
      {children}
    </div>
  ) : null
}

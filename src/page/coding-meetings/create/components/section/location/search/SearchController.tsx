"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import { CodingMeetingLocationSearchFormData } from "@/interfaces/form"
import { debounce } from "lodash-es"
import React, { useEffect, useMemo, useRef } from "react"
import { FieldErrors, useController, useForm } from "react-hook-form"
import { IoIosCloseCircle } from "react-icons/io"
import AutoComplete from "./AutoComplete"
import { twMerge } from "tailwind-merge"
import { useKakaoMapPlaceApi } from "@/page/coding-meetings/create/hooks/useKakaoMapPlaceApi"
import {
  PlaceAutoComplete,
  SearchPlaceResultData,
} from "@/recoil/atoms/coding-meeting/mapData"
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil"
import SearchResultPlaceMaps from "../SearchResultPlaceMaps"
import { locationSearchRules } from "@/page/coding-meetings/create/controls/rules/location/location-search-rules"

function SearchController() {
  const { control } = useForm<CodingMeetingLocationSearchFormData>()
  const { field: searchField } = useController({
    control,
    name: "keyword",
    rules: locationSearchRules,
    defaultValue: "",
  })

  const { kakaoPlaceApi } = useKakaoMapPlaceApi()

  const [placeAutoComplete, setPlaceAutoComplete] =
    useRecoilState(PlaceAutoComplete)
  const resetPlaceAutoComplete = useResetRecoilState(PlaceAutoComplete)
  const setSearchPlaceResultData = useSetRecoilState(SearchPlaceResultData)
  const resetSearchPlaceResultData = useResetRecoilState(SearchPlaceResultData)

  const containerRef = useRef<HTMLDivElement>(null) // clickAway에서 활용
  const inputFieldRef = useRef<HTMLInputElement>(null) // 인풋요소를 blur, focus 하기 위해
  const isComposingRef = useRef<boolean>(false) // IME 이슈 해결에서 활용

  const inputFoucsedClassnames = twMerge([
    "p-0 focus-within:border-colorsGray overflow-hidden",
    placeAutoComplete.open &&
      "focus-within:border-transparent border-transparent rounded-tl-2xl rounded-tr-2xl rounded-bl-none rounded-br-none shadow-[0_4px_8px_0_rgba(0,0,0,.13)]",
  ])

  // debounce handler
  const debounceSearchCallback = (value: string) => {
    if (isComposingRef.current === true) {
      inputFieldRef.current!.blur()
      inputFieldRef.current!.focus()
    }

    if (!kakaoPlaceApi) {
      setPlaceAutoComplete((prev) => ({
        ...prev,
        open: false,
        loading: false,
        keyword: value,
        placeList: [],
      }))

      return
    }

    if (!value) {
      resetPlaceAutoComplete()

      return
    }

    if (placeAutoComplete.loading) {
      return
    }

    setPlaceAutoComplete((prev) => ({
      ...prev,
      open: true,
      loading: true,
      keyword: value,
    }))

    kakaoPlaceApi.keywordSearch(value, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaceAutoComplete((prev) => ({
          ...prev,
          loading: false,
          placeList: data,
        }))

        return
      }

      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setPlaceAutoComplete((prev) => ({
          ...prev,
          loading: false,
          placeList: [],
        }))

        return
      }

      // error
      console.log("place search error(debounce)", { value })

      setPlaceAutoComplete((prev) => ({
        ...prev,
        loading: false,
        placeList: [],
      }))
    })
  }

  const debounceKeyword = useMemo(
    () => debounce(debounceSearchCallback, 400),
    [kakaoPlaceApi] /* eslint-disable-line */,
  ) // kakaoApi 외 나머지는 내부에서 참조(ref)로 값을 사용할 수 있음

  // change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceAutoComplete((prev) => ({ ...prev, open: false }))
    searchField.onChange(e.target.value)

    debounceKeyword(e.target.value)
  }

  // search submit handler
  const onSearchSubmit = ({ keyword }: CodingMeetingLocationSearchFormData) => {
    setPlaceAutoComplete((prev) => ({ ...prev, open: false }))
    inputFieldRef.current!.blur()

    kakaoPlaceApi?.keywordSearch(keyword, (data, status, _pagination) => {
      setTimeout(() => {
        setPlaceAutoComplete((prev) => ({
          ...prev,
          open: false,
        }))
      }, 400) // delay시간을 debounce 시간으로 설정

      if (status === kakao.maps.services.Status.OK) {
        setSearchPlaceResultData({
          keyword,
          placeList: data,
        })

        return
      }

      if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setSearchPlaceResultData({
          keyword,
          placeList: [],
        })

        return
      }

      // error
      console.log("place search error", { keyword })

      setSearchPlaceResultData({
        keyword,
        placeList: [],
      })
    })
  }

  const onSearchInvalid = (
    errors: FieldErrors<CodingMeetingLocationSearchFormData>,
  ) => {
    // console.log("searchErrors", { errors })
  }

  // effect: add clickAway listener
  // cleanup
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (!containerRef.current) return

      const target = e.target as HTMLElement
      if (containerRef.current.contains(target)) {
        return
      }

      setPlaceAutoComplete((prev) => ({ ...prev, open: false }))
    }

    window.addEventListener("click", handleClickAway)

    return () => {
      window.removeEventListener("click", handleClickAway)

      resetSearchPlaceResultData()
      resetPlaceAutoComplete()
    }
  }, []) /* eslint-disable-line */

  return (
    <div ref={containerRef}>
      <form
        className="relative z-[9]"
        onSubmit={control.handleSubmit(onSearchSubmit, onSearchInvalid)}
      >
        <RowInput
          ref={inputFieldRef}
          name="keyword"
          onChange={handleChange}
          value={searchField.value}
          onFocus={(e) => {
            placeAutoComplete.placeList?.length &&
              !placeAutoComplete.open &&
              setPlaceAutoComplete((prev) => ({ ...prev, open: true }))
          }}
          onCompositionStart={(e) => {
            isComposingRef.current = true
          }}
          onCompositionEnd={(e) => {
            isComposingRef.current = false
          }}
          classNames={{
            container: "flex-row",
            wrapper: inputFoucsedClassnames,
          }}
          fullWidth
          autoComplete="off"
          spellCheck="false"
          placeholder="위치를 검색해주세요"
          sideField={
            <div className="flex justify-between items-center shrink-0">
              {searchField.value ? (
                <Button
                  type="button"
                  className="group"
                  onClick={() => {
                    searchField.onChange("")
                    resetPlaceAutoComplete()
                  }}
                >
                  <IoIosCloseCircle className="text-[#828282] text-lg pointerhover:group-hover:text-colorsDarkGray" />
                </Button>
              ) : null}
              <Button type="submit" className="group">
                <Icons.Search className="shrink-0 text-xl pointerhover:group-hover:text-primary" />
              </Button>
            </div>
          }
        />
        <AutoComplete.Wrapper>
          <AutoComplete
            onPlaceClick={({ event, place }) => {
              setPlaceAutoComplete((prev) => ({
                ...prev,
                open: false,
              }))

              setTimeout(() => {
                searchField.onChange(place.place_name)

                setSearchPlaceResultData((prev) => ({
                  ...prev,
                  placeList: [place],
                }))
              }, 0)
            }}
          />
        </AutoComplete.Wrapper>
      </form>
      <div className="mt-10">
        <SearchResultPlaceMaps />
      </div>
    </div>
  )
}

export default SearchController

import { atom } from "recoil"

export type Marker = {
  position: {
    lat: string
    lng: string
  }
  content: string
}

export const SearchPlaceResultData = atom<{
  keyword: string
  placeList: kakao.maps.services.PlacesSearchResult
}>({
  key: "codingmeeting-search-result-place",
  default: {
    keyword: "",
    placeList: [],
  },
})

export const PlaceAutoComplete = atom<{
  open: boolean
  loading: boolean
  keyword: string
  placeList: kakao.maps.services.PlacesSearchResult
}>({
  key: "codingmeeting-place-autocomplete",
  default: {
    open: false,
    loading: false,
    keyword: "",
    placeList: [],
  },
})

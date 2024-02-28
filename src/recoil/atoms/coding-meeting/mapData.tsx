import { atom } from "recoil"

export const CodingMeetingMapData = atom<
  kakao.maps.services.PlacesSearchResult | undefined
>({
  key: "CodingMeeting-MapData-atom",
  default: undefined,
})

export type Marker = {
  position: {
    lat: string
    lng: string
  }
  content: string
}

export const SelectedPlace = atom<Marker | undefined>({
  key: "CodingMeeting-SelectedPlace-atom",
  default: undefined,
})

export const SearchMapMarker = atom<Marker[] | undefined>({
  key: "CodingMeeting-Marker-atom",
  default: undefined,
})

export type Location = {
  coding_meeting_location_id: string
  coding_meeting_location_place_name: string
  coding_meeting_location_longitude: string
  coding_meeting_location_latitude: string
}

export const LocationForSubmit = atom<Location | undefined>({
  key: "CodingMeeting-Location-atom",
  default: undefined,
})

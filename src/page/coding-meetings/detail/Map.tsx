"use client"

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk"

interface DetailMapProps {
  x: string
  y: string
  placeName: string
}

function DetailMap({ x, y, placeName }: DetailMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP!,
    libraries: ["services"],
  })

  return (
    <Map
      center={{
        lat: Number(x),
        lng: Number(y),
      }}
      level={3}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapMarker position={{ lat: Number(x), lng: Number(y) }} />
    </Map>
  )
}

export default DetailMap

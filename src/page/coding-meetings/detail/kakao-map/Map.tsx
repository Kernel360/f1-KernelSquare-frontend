"use client"

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk"
import DetailMapControl from "@/page/coding-meetings/detail/kakao-map/Control"

interface DetailMapProps {
  x: string
  y: string
  placeName: string
}

function DetailMap({ x, y, placeName }: DetailMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP!,
    libraries: ["services"],
  })

  const zoomLevel = {
    max: 1,
    min: 6,
    initial: 3,
  }

  if (error) throw error

  return (
    <Map
      center={{
        lat: Number(x),
        lng: Number(y),
      }}
      zoomable={false}
      level={zoomLevel.initial}
      maxLevel={zoomLevel.max}
      minLevel={zoomLevel.min}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapMarker position={{ lat: Number(x), lng: Number(y) }} />
      <DetailMapControl
        maxZoomLevel={zoomLevel.max}
        minZoomLevel={zoomLevel.min}
        location={{
          x: Number(x),
          y: Number(y),
        }}
      />
    </Map>
  )
}

export default DetailMap

import React, { useState, useEffect } from "react"
import {
  Map,
  MapMarker,
  MapMarkerProps,
  useKakaoLoader,
} from "react-kakao-maps-sdk"

declare const window: typeof globalThis & {
  kakao: any
}

// window.kakao

interface MarkerType {
  position: {
    lan: number
    lat: number
  }
  content: string
}

export default function KakaoMapPage({ keyword }: { keyword: string }) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP!,
    libraries: ["services"],
  })
  const [info, setInfo] = useState<any>()
  const [markers, setMarkers] = useState<MarkerType[]>([])
  const [map, setMap] = useState<kakao.maps.Map>()

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()
        let markers = []
        console.log("data", data)

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          })
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        setMarkers(markers as any[])

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    })
  }, [map, keyword])
  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: "400px",
        height: "300px",
      }}
      level={3}
      onCreate={setMap}
    >
      {(markers as any[]).map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: "#000" }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  )
}

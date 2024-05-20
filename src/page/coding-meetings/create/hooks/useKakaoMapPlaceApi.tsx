"use client"

import { useEffect, useState } from "react"
import { useKakaoLoader } from "react-kakao-maps-sdk"

export function useKakaoMapPlaceApi() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP!,
    libraries: ["services"],
  })

  const [kakaoPlaceApi, setKakaoPlaceApi] =
    useState<kakao.maps.services.Places | null>(null)

  useEffect(() => {
    if (loading || error) {
      return
    }

    if (kakaoPlaceApi) return

    setKakaoPlaceApi(new kakao.maps.services.Places())
  }, [loading, error, kakaoPlaceApi])

  return {
    loading,
    error,
    kakaoPlaceApi,
  }
}

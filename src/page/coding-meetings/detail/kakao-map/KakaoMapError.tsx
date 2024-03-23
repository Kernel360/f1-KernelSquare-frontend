"use client"

import * as Sentry from "@sentry/nextjs"
import { Icons } from "@/components/icons/Icons"
import { useEffect } from "react"
import { FallbackProps } from "react-error-boundary"

function KakakoMapError({ error }: FallbackProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_ACTIVE === "enabled") {
      Sentry.withScope((scope) => {
        const sentryKakakoMapError = new Error("kakaoMap 에러")
        sentryKakakoMapError.name = "카카오 Map"

        Sentry.captureException(sentryKakakoMapError)
      })
    }
  }, [error])

  return (
    <div className="absolute left-0 top-0 z-[2] w-full h-full flex flex-col justify-center items-center bg-white">
      <div className="w-8 h-8 flex justify-center items-center rounded-full border border-[#828282]">
        <Icons.MapMarker className="text-[#828282]" />
      </div>
      <div className="mt-5 text-sm text-[#828282]">카카오 맵 로드 실패</div>
    </div>
  )
}

export default KakakoMapError

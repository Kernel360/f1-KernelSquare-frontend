"use client"

import { useLottie } from "lottie-react"
import noSearchResult from "@/assets/lottie/no-search-result.json"
import { CSSProperties, useLayoutEffect } from "react"

interface NoSearchResultProps {
  style?: CSSProperties
}

function NoSearchResult({ style }: NoSearchResultProps) {
  const { setSpeed, View } = useLottie({
    animationData: noSearchResult,
    style: { ...style },
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default NoSearchResult

"use client"

import { useLottie } from "lottie-react"
import contentLoading from "@/assets/lottie/content-loading.json"
import { CSSProperties, useLayoutEffect } from "react"

interface ContentLoadingProps {
  style?: CSSProperties
}

function ContentLoading({ style }: ContentLoadingProps) {
  const { setSpeed, View } = useLottie({
    animationData: contentLoading,
    style: { ...style },
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default ContentLoading

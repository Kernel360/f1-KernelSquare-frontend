"use client"

import { useLottie } from "lottie-react"
import { CSSProperties, useLayoutEffect } from "react"
import lightbulb from "@/assets/lottie/light-bulb.json"

interface LightBulbProps {
  style?: CSSProperties
}

function LightBulb({ style }: LightBulbProps) {
  const { setSpeed, View } = useLottie({
    animationData: lightbulb,
    style: { ...style },
  })

  useLayoutEffect(() => {
    setSpeed(0.05)
  }, []) /* eslint-disable-line */

  return View
}

export default LightBulb

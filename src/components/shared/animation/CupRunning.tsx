"use client"

import { useLottie } from "lottie-react"
import cupRunning from "@/assets/lottie/cup-running.json"
import { type CSSProperties, useEffect } from "react"

interface CupRunningProps {
  style?: CSSProperties
}

function CupRunning({ style }: CupRunningProps) {
  const { setSpeed, View } = useLottie({
    animationData: cupRunning,
    style: { ...style },
  })

  useEffect(() => {
    setSpeed(0.5)
  }, []) /* eslint-disable-line */

  return View
}

export default CupRunning

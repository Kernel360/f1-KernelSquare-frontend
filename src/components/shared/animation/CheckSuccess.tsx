"use client"

import { useLottie } from "lottie-react"
import checkSuccess from "@/assets/lottie/check-success.json"
import { CSSProperties, useLayoutEffect } from "react"

interface CheckSuccessProps {
  style?: CSSProperties
  className?: string
}

function CheckSuccess({ style, className }: CheckSuccessProps) {
  const { setSpeed, View } = useLottie({
    animationData: checkSuccess,
    style: { ...style },
    className,
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default CheckSuccess

"use client"

import { useLottie } from "lottie-react"
import mentee from "@/assets/lottie/mentee.json"
import { CSSProperties, useLayoutEffect } from "react"

interface CheckSuccessProps {
  style?: CSSProperties
  className?: string
}

function Mentee({ style, className }: CheckSuccessProps) {
  const { setSpeed, View } = useLottie({
    animationData: mentee,
    style: { ...style },
    className,
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default Mentee

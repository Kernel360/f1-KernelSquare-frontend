"use client"

import { useLottie } from "lottie-react"
import notFound from "@/assets/lottie/not-found.json"
import { CSSProperties, useLayoutEffect } from "react"

interface NotFoundProps {
  style?: CSSProperties
  className?: string
}

function NotFound404({ style, className }: NotFoundProps) {
  const { setSpeed, View } = useLottie({
    animationData: notFound,
    style: { ...style },
    className,
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default NotFound404

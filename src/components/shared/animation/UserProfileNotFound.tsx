"use client"

import { useLottie } from "lottie-react"
import userProfileNotFound from "@/assets/lottie/user-profile-not-found.json"
import { CSSProperties, useLayoutEffect } from "react"

interface NotFoundProps {
  style?: CSSProperties
  className?: string
}

function UserProfileNotFound({ style, className }: NotFoundProps) {
  const { setSpeed, View } = useLottie({
    animationData: userProfileNotFound,
    style: { ...style },
    className,
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default UserProfileNotFound

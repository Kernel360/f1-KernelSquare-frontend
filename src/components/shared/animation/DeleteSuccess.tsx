"use client"

import { useLottie } from "lottie-react"
import deleteSuccess from "@/assets/lottie/delete-success.json"
import { CSSProperties, useLayoutEffect } from "react"

interface DeleteSuccessProps {
  style?: CSSProperties
}

function DeleteSuccess({ style }: DeleteSuccessProps) {
  const { setSpeed, View } = useLottie({
    animationData: deleteSuccess,
    style: { ...style },
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default DeleteSuccess

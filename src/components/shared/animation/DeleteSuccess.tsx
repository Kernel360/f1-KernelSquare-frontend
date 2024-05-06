"use client"

import { useLottie } from "lottie-react"
import deleteSuccess from "@/assets/lottie/delete-success.json"
import { CSSProperties, useLayoutEffect } from "react"

interface DeleteSuccessProps {
  style?: CSSProperties
  className?: string
  loop?: boolean
}

function DeleteSuccess({ style, className, loop = false }: DeleteSuccessProps) {
  const { setSpeed, View } = useLottie({
    animationData: deleteSuccess,
    loop,
    style: { ...style },
    className,
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default DeleteSuccess

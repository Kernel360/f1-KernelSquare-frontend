"use client"

import Lottie, { useLottie } from "lottie-react"
import listLoading from "@/assets/lottie/list-loading.json"
import { CSSProperties, useLayoutEffect } from "react"
import { twMerge } from "tailwind-merge"

interface ListLoadingProps {
  style?: CSSProperties
}

function ListLoading({ style }: ListLoadingProps) {
  const { setSpeed, View } = useLottie({
    animationData: listLoading,
    style: { ...style },
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default ListLoading

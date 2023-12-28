"use client"

import { useLottie } from "lottie-react"
import { CSSProperties, useLayoutEffect } from "react"
import listLoading from "@/assets/lottie/list-loading.json"

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

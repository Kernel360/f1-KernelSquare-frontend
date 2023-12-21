"use client"

import Lottie from "lottie-react"
import noContentLottie from "@/assets/lottie/no-content.json"

function NoContent() {
  return (
    <Lottie
      animationData={noContentLottie}
      loop={false}
      className="w-32 min-w-[128px] min-h-[128px]"
    />
  )
}

export default NoContent

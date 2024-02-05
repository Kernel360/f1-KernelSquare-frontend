"use client"

import { useLottie } from "lottie-react"
import coffeechat from "@/assets/lottie/coffee-chat.json"
import { CSSProperties, useLayoutEffect } from "react"

interface CoffeeChatProps {
  style?: CSSProperties
  className?: string
}

function CoffeeChat({ style, className }: CoffeeChatProps) {
  const { setSpeed, View } = useLottie({
    animationData: coffeechat,
    style: { ...style },
    className,
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default CoffeeChat

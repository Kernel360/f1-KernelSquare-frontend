"use client"

import { useLottie } from "lottie-react"
import { CSSProperties, useLayoutEffect } from "react"
import createAnswer from "@/assets/lottie/create-answer.json"

interface CreateAnswerProps {
  style?: CSSProperties
}

function CreateAnswerAnime({ style }: CreateAnswerProps) {
  const { setSpeed, View } = useLottie({
    animationData: createAnswer,
    style: { ...style },
  })

  useLayoutEffect(() => {
    setSpeed(0.7)
  }, []) /* eslint-disable-line */

  return View
}

export default CreateAnswerAnime

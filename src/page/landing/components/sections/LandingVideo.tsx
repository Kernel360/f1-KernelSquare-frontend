"use client"

import { useRef } from "react"
import useHeaderObserver from "../../hooks/useHeaderObserver"

const LandingVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useHeaderObserver({ ref: videoRef, keyword: "video" })
  return (
    <video
      ref={videoRef}
      width={"100%"}
      height={"100vh"}
      preload="auto"
      autoPlay
      muted
      loop
      className="object-cover h-screen w-full grayscale-[50%] contrast-[90%] brightness-50"
    >
      <source src="/video/landing_video.webm" type="video/webm" />
      <source src="/video/landing_video.mp4" type="video/mp4" />
    </video>
  )
}

export default LandingVideo

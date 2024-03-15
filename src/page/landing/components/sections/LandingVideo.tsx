"use client"

import landingTabAtom from "@/recoil/atoms/landingTab"
import { useEffect, useRef } from "react"
import { useSetRecoilState } from "recoil"

const LandingVideo = () => {
  const setLandingTab = useSetRecoilState(landingTabAtom)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    if (videoRef.current) {
      observer = new IntersectionObserver(
        () => {
          setLandingTab("video")
        },
        { threshold: 0.1 },
      )
      observer.observe(videoRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [videoRef, setLandingTab])
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

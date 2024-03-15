"use client"

import Image from "next/image"
import LandingContainer from "../LandingContainer"
import landing_main_image from "@/assets/landing/graph.svg"
import landing_main_text from "@/assets/landing/main_text.svg"
import { useSetRecoilState } from "recoil"
import landingTabAtom from "@/recoil/atoms/landingTab"
import { useEffect, useRef } from "react"

const LandingGraph = () => {
  const setLandingTab = useSetRecoilState(landingTabAtom)
  const graphRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver
    if (graphRef.current) {
      observer = new IntersectionObserver(
        () => {
          setLandingTab("graph")
        },
        { threshold: 0.5 },
      )
      observer.observe(graphRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [graphRef, setLandingTab])

  return (
    <LandingContainer className="flex flex-col sm:flex-row gap-10 justify-center items-center">
      <Image
        src={landing_main_image}
        alt="landing_main_image"
        width={500}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        className="w-[300px] sm:w-[500px]"
        ref={graphRef}
      />
      <Image
        src={landing_main_text}
        alt="landing_main_text"
        width={500}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        className="w-[300px] sm:w-[500px]"
      />
    </LandingContainer>
  )
}

export default LandingGraph

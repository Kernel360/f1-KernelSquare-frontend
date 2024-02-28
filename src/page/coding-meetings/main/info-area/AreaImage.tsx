"use client"

import Image from "next/image"
import { memo } from "react"
import codingMeetingSVG from "@/assets/codingMeetingInfo.svg"

function CodingMeetingAreaImage() {
  return (
    <Image
      priority
      src={codingMeetingSVG}
      className="hidden sm:block"
      alt="svg"
    />
  )
}

export default memo(CodingMeetingAreaImage)

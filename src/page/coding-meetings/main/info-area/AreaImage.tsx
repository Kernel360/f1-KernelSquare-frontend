"use client"

import Image from "next/image"
import { memo } from "react"
import codingMeetingSVG from "@/assets/codingMeetingInfo.svg"
import { twMerge } from "tailwind-merge"

function CodingMeetingAreaImage({ className }: { className?: string }) {
  const classNames = twMerge(["hidden pc:block", className])

  return (
    <Image priority src={codingMeetingSVG} className={classNames} alt="svg" />
  )
}

export default memo(CodingMeetingAreaImage)

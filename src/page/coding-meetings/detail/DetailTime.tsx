"use client"

import { getCollapsedDate } from "@/util/getDate"

interface DetailCodingMeetingTime {
  startTime: string
  endTime: string
}

function DetailCodingMeetingTime({
  startTime,
  endTime,
}: DetailCodingMeetingTime) {
  return (
    <span className="font-medium text-base">
      {getCollapsedDate({
        start: startTime,
        end: endTime,
      })}
    </span>
  )
}

export default DetailCodingMeetingTime

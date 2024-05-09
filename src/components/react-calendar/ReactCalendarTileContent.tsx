"use client"

import { getHoliday } from "@/util/getDate"
import dayjs from "dayjs"
import { TileArgs } from "react-calendar"

interface ReactCalendarTileContentProps extends TileArgs {}

function ReactCalendarTileContent({ date }: ReactCalendarTileContentProps) {
  const today = dayjs().startOf("days").toDate()
  const isToday = date.toString() === today.toString()

  const holiday = getHoliday(date)

  if (isToday) return <TileContent>오늘</TileContent>

  if (holiday)
    return <TileContent>{holiday.name.replaceAll(" ", "\n")}</TileContent>

  return null
}

export default ReactCalendarTileContent

const TileContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[10px] whitespace-pre flex-1 flex">
      <span>{children}</span>
    </div>
  )
}

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import dayjs from "dayjs"
import { useEffect, useId, useState } from "react"
import TimeOptions from "./sections/date/TimeOptions"
import { useSelectedDayTab } from "../hooks/useSelectedDayTab"
import { useSelectedChatTime } from "../hooks/useSelectedChatTime"

function DaySelectTabs() {
  const { selectedDate: startDate } = useSelectedChatTime()

  const { setSelectedDayTab, selectedDayTabOptions } = useSelectedDayTab()

  const [selectedDay, setSelectedDay] = useState<string>(
    startDate
      ? dayjs(startDate as Date).format("YYYY-MM-DD")
      : dayjs().add(7, "days").format("YYYY-MM-DD"),
  )

  const uniqueId = useId()

  useEffect(() => {
    const dayInstance = dayjs(startDate as Date)

    setSelectedDay(dayInstance.format("YYYY-MM-DD"))
    setSelectedDayTab(dayInstance.toDate())
  }, [startDate]) /* eslint-disable-line */

  return (
    <Tabs
      value={selectedDay}
      onValueChange={(value) => {
        setSelectedDay(value)
        setSelectedDayTab(dayjs(value).toDate())
      }}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3 self-center p-0 h-full">
        {selectedDayTabOptions?.map((day, i) => {
          return (
            <TabsTrigger
              key={`${uniqueId}-trigger-${day}-${i}`}
              value={day}
              className="text-xs"
            >
              {dayjs(day).format("YYYY.MM.DD")}
            </TabsTrigger>
          )
        })}
        {selectedDayTabOptions?.map((day, i) => {
          return (
            <TabsContent
              key={`${uniqueId}-content-${day}-${i}`}
              value={day}
              className="col-span-3"
            >
              <div className="w-full">
                <TimeOptions day={selectedDay} />
              </div>
            </TabsContent>
          )
        })}
      </TabsList>
    </Tabs>
  )
}

export default DaySelectTabs

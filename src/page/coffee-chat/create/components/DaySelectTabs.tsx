"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import {
  ReservationSelectedDateAtom,
  SelectedDayTab,
} from "@/recoil/atoms/coffee-chat/date"
import { getChatPeriods } from "@/util/chat/time"
import dayjs from "dayjs"
import { useEffect, useId, useMemo, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import TimeOptions from "./sections/date/TimeOptions"

function DaySelectTabs() {
  const startDate = useRecoilValue(ReservationSelectedDateAtom)

  const setSelectedDayTab = useSetRecoilState(SelectedDayTab)

  const [selectedDay, setSelectedDay] = useState<string>(
    startDate
      ? dayjs(startDate as Date).format("YYYY-MM-DD")
      : dayjs().add(7, "days").format("YYYY-MM-DD"),
  )

  const uniqueId = useId()

  const selectedDayOptions = useMemo(() => {
    const {
      chat: [chatStart, chatEnd],
    } = getChatPeriods({
      startTime: startDate
        ? dayjs(startDate as Date).format()
        : dayjs().add(7, "days").format(),
    })

    return [
      chatStart.format("YYYY-MM-DD"),
      chatStart.add(1, "days").format("YYYY-MM-DD"),
      chatEnd.format("YYYY-MM-DD"),
    ]
  }, [startDate])

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
        {selectedDayOptions.map((day, i) => {
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
        {selectedDayOptions.map((day, i) => {
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

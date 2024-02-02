"use client"

import Tag from "@/components/shared/tag/Tag"
import type { TimeOptionsProps } from "../CreateCoffeeChatReservationPage.types"

const TimeOptions = ({ date }: TimeOptionsProps) => {
  const possibleTimes = []
  const handleRegister = (time: string) => {
    possibleTimes.push(time)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-rows-4 sm:grid-cols-4 gap-4 shrink-0 m-auto">
      {date.map((date, i) => (
        <Tag
          className={
            "flex border-[1px] border-slate-200 px-6 py-2 rounded justify-center bg-white"
          }
          key={date + i}
          onClick={() => handleRegister(date)}
          onSelect={() => console.log("date", date)}
        >
          <div>{date}</div>
        </Tag>
      ))}
    </div>
  )
}

export default TimeOptions

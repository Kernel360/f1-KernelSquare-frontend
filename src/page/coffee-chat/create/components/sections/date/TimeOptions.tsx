import TimeZoneSection, { TimeZone } from "./TimeZoneSection"
import { useState } from "react"
import { AM, PM } from "@/constants/timeOptions"
import TimeOptionButton from "../../TimeOptionButton"
import Spacing from "@/components/shared/Spacing"
import dayjs from "dayjs"

interface TimeOptionsProps {
  day: string
}

function TimeOptions({ day }: TimeOptionsProps) {
  const [timeZone, setTimeZone] = useState<TimeZone>(TimeZone.AM)

  const targetOptions = timeZone === TimeZone.AM ? AM : PM

  return (
    <div>
      <div className="my-4">
        <TimeZoneSection onTimeZoneChange={setTimeZone} />
      </div>
      <ul className="grid w-full grid-cols-4 gap-2 px-4">
        {targetOptions.map((timeOption) => {
          return (
            <TimeOptionButton
              key={timeOption}
              dateTime={dayjs(`${day}T${timeOption}`).toDate()}
            />
          )
        })}
      </ul>
      <Spacing size={16} />
    </div>
  )
}

export default TimeOptions

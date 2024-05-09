import { DirectionIcons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { TimeZone } from "@/constants/timeOptions"
import { useState } from "react"

interface TimeZoneSectionProps {
  onTimeZoneChange?: (timeZone: TimeZone) => void
}

function TimeZoneSection({ onTimeZoneChange }: TimeZoneSectionProps) {
  const [timeZone, setTimeZone] = useState<TimeZone>(TimeZone.AM)

  const timeZoneArrowClassNames = "cursor-pointer group-disabled:text-slate-200"

  const setAM = () => {
    setTimeZone(TimeZone.AM)
    onTimeZoneChange && onTimeZoneChange(TimeZone.AM)
  }
  const setPM = () => {
    setTimeZone(TimeZone.PM)
    onTimeZoneChange && onTimeZoneChange(TimeZone.PM)
  }

  return (
    <div className="flex w-full gap-1 items-center px-4">
      <Button
        className="group p-1"
        disabled={timeZone === TimeZone.AM}
        onClick={setAM}
      >
        <DirectionIcons.Left className={timeZoneArrowClassNames} />
      </Button>
      <div className="font-bold text-primary text-lg flex-1 text-center">
        {timeZone === "AM" ? "오전" : "오후"}
      </div>
      <Button
        className="group p-1"
        disabled={timeZone === TimeZone.PM}
        onClick={setPM}
      >
        <DirectionIcons.Right className={timeZoneArrowClassNames} />
      </Button>
    </div>
  )
}

export default TimeZoneSection

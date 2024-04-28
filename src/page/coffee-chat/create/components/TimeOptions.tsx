"use client"

import type { TimeOptionsProps } from "../CreateCoffeeChatReservationPage.types"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  ScheduleListAtomFamily,
  SelectedDate,
  TimeCount,
} from "@/recoil/atoms/coffee-chat/schedule"
import { twMerge } from "tailwind-merge"
import Button from "@/components/shared/button/Button"
import { toast } from "react-toastify"
import Limitation from "@/constants/limitation"
import { useLayoutEffect } from "react"
import { validationMessage } from "@/constants/message/validation"

const TimeOptions = ({ date }: TimeOptionsProps) => {
  const selectedDate = useRecoilValue(SelectedDate)
  const [schedulelist, setSchedulelist] = useRecoilState(
    ScheduleListAtomFamily(selectedDate),
  )
  const [timeCount, setTimeCount] = useRecoilState(TimeCount)

  const handleRegister = (time: string) => {
    if (schedulelist.schedule.includes(time)) {
      setSchedulelist({
        schedule: schedulelist.schedule.filter((el) => el !== time),
      })
    } else {
      if (timeCount === Limitation.mentoring_time)
        return toast.error(validationMessage.overtimeCntLimit, {
          toastId: "overTimeCntLimit",
          position: "top-center",
        })
      setSchedulelist({ schedule: [...schedulelist.schedule, time] })
    }
  }

  const buttonClassName = (isSchedule: boolean) =>
    twMerge([
      `border-[1px] shadow-sm duration-150 shadow-sm rounded px-6 py-2`,
      isSchedule
        ? "bg-slate-300 border-slate-200"
        : "bg-white hover:bg-colorsLightGray",
    ])

  useLayoutEffect(() => {
    setSchedulelist({
      schedule: [],
    })
    setTimeCount(0)
  }, []) /* eslint-disable-line */

  return (
    <div className="grid gap-4 grid-cols-4">
      {date.map((time, i) => (
        <Button
          className={buttonClassName(schedulelist.schedule.includes(time))}
          key={time + i}
          onClick={() => handleRegister(time)}
        >
          <time
            className={`w-max shrink-0 text-sm text-secondary font-semibold`}
          >
            {time}
          </time>
        </Button>
      ))}
    </div>
  )
}

export default TimeOptions

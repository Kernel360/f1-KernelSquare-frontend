"use client"

import {
  CodingMeetingDay,
  EndTime,
  StartTime,
  type Time,
} from "@/recoil/atoms/coding-meeting/dateTime"
import { formatDay } from "@/util/getDate"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { useRecoilState } from "recoil"

const useHandleCreateCodingMeetingTime = () => {
  const [day, setDay] = useRecoilState(CodingMeetingDay)
  const [startTime, setStartTime] = useRecoilState(StartTime)
  const [endTime, setEndTime] = useRecoilState(EndTime)

  const formattedDay = formatDay(day + "")
  const formatMinute = (minute: number | string) =>
    String(minute).length === 1 ? "0" + String(minute) : minute + ""

  const formatTime = ({ hour, minute }: Time) => `${hour}:${minute}`

  const formatByUTC = (time: string) => {
    dayjs.extend(utc)
    return dayjs(`${formattedDay} ${time}`).utc().format().slice(0, -1)
  }

  const resetTimes = () => {
    setStartTime({
      hour: "",
      minute: "",
    })
    setEndTime({
      hour: "",
      minute: "",
    })
  }

  const formattedStartTime = dayjs(`${formattedDay} ${formatTime(startTime)}`)
  const formattedEndTime = dayjs(`${formattedDay} ${formatTime(endTime)}`)

  const resetDateTimes = () => {
    setDay(new Date())
    setStartTime({
      hour: "",
      minute: "",
    })
    setEndTime({
      hour: "",
      minute: "",
    })
  }

  return {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    formatMinute,
    formatTime,
    formatByUTC,
    resetTimes,
    resetDateTimes,
    formattedStartTime,
    formattedEndTime,
  }
}

export default useHandleCreateCodingMeetingTime

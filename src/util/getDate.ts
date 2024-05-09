import Holidays from "@/constants/holidays"
import dayjs from "dayjs"
import "dayjs/locale/ko"

dayjs.locale("ko")

interface dateProps {
  date: string
}

const getDate = ({ date }: dateProps) => dayjs(date).format("YYYY년 MM월 DD일")

/**
 *
 * @param date Date (날짜 객체)
 * @returns 'DD'로 일자만 반환
 */
const getDay = (date: Date) => dayjs(date).format("DD")

/**
 *
 * @param date Date (날짜 객체)
 * @returns 'HH:mm'으로 시간, 분만 반환
 */
const getTime = (date: Date | string) => dayjs(date).format("HH:mm")

/**
 *
 * @param date Date (날짜 객체)
 * @returns 'HH'으로 시간만 반환
 */
const getHour = (date: Date | string) => dayjs(date).format("HH")

const getDeadline = ({ date }: dateProps) =>
  dayjs(date).add(7, "day").format("YYYY년 MM월 DD일")

const getNow = () => {
  let now = dayjs()
  return now.format()
}

const getKorDayjs = (date: Date | dayjs.Dayjs | string) => {
  return dayjs(date)
}

const getKorRelativeTime = ({
  now,
  targetDate,
}: {
  now: string
  targetDate: string
}) => {
  const IntlFormatter = new Intl.RelativeTimeFormat("ko")

  const nowDateFormat = dayjs(now)

  const targetDateFormat = dayjs(targetDate)

  const diff = targetDateFormat.diff(nowDateFormat)

  const MilliSecondUnit = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 60 * 60 * 24 * 1000,
    week: 60 * 60 * 24 * 7 * 1000,
    month: 60 * 60 * 24 * 30 * 1000,
    year: 60 * 60 * 24 * 365 * 1000,
  }

  const order = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ] as const

  let shouldReturn = false
  let targetDiff = 0
  let targetUnit = "year" as keyof typeof MilliSecondUnit | "now"

  for (const unit of order) {
    const unitDiffResult = parseInt(
      (diff / MilliSecondUnit[unit]).toFixed(2),
      10,
    )
    const parsedDiff = Math.abs(unitDiffResult)

    if (shouldReturn) break

    switch (unit) {
      case "second":
        if (parsedDiff <= 1) {
          targetUnit = "now"

          shouldReturn = true

          break
        }

        if (parsedDiff < 60) {
          targetDiff = unitDiffResult
          targetUnit = "second"

          shouldReturn = true

          break
        }

        break
      case "minute":
        if (parsedDiff < 60) {
          targetDiff = unitDiffResult
          targetUnit = "minute"

          shouldReturn = true

          break
        }

        break
      case "hour":
        if (parsedDiff < 24) {
          targetDiff = unitDiffResult
          targetUnit = "hour"

          shouldReturn = true

          break
        }

        break
      case "day":
        if (parsedDiff < 7) {
          targetDiff = unitDiffResult
          targetUnit = "day"

          shouldReturn = true

          break
        }

        break
      case "week":
        if (parsedDiff < 5) {
          targetDiff = unitDiffResult
          targetUnit = "week"

          shouldReturn = true

          break
        }

        break
      case "month":
        if (parsedDiff < 12) {
          targetDiff = unitDiffResult
          targetUnit = "month"

          shouldReturn = true

          break
        }

        break
      case "year":
        targetDiff = unitDiffResult

        shouldReturn = true

        break
    }
  }

  if (targetUnit === "now") {
    return "방금 전"
  }

  return IntlFormatter.format(targetDiff, targetUnit)
}

const formatDay = (date: string) => dayjs(date).format("YYYY-MM-DD")

const formatDate = ({ date }: dateProps, time: string) =>
  `${dayjs(date).format("YYYY-MM-DD")}T${time}:00`

const getKorExactTime = (date: string) =>
  dayjs(date).format("YYYY년 MM월 DD일 HH시 mm분")

export {
  getDate,
  getDay,
  getTime,
  getHour,
  getDeadline,
  getNow,
  getKorRelativeTime,
  getKorDayjs,
  formatDay,
  formatDate,
  getKorExactTime,
}

export function getCollapsedDate({
  start,
  end,
}: {
  start: string
  end: string
}) {
  const startDate = getKorDayjs(start)
  const endDate = getKorDayjs(end)

  return `${startDate.format("YYYY년 MM월 DD일 HH:mm")} ~ ${endDate.format(
    "HH:mm",
  )}`
}

export function getHoliday(date: Date) {
  return Holidays.find((day) => day.date === dayjs(date).format("YYYY-MM-DD"))
}

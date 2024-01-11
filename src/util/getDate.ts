import dayjs from "dayjs"

interface dateProps {
  date: string
}

const getDate = ({ date }: dateProps) => dayjs(date).format("YYYY년 MM월 DD일")

const getDeadline = ({ date }: dateProps) =>
  dayjs(date).add(7, "day").format("YYYY년 MM월 DD일")

const getNow = () => {
  let now = dayjs()
  return now.format()
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
        if (parsedDiff < 1) {
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

export { getDate, getDeadline, getNow, getKorRelativeTime }

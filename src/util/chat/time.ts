import dayjs from "dayjs"
import { getKorDayjs } from "../getDate"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

export function isValidTime(startTime: string) {
  if (!startTime) return false

  const now = getKorDayjs(dayjs())

  const startKorTime = getKorDayjs(startTime)
  const endKorTime = startKorTime.clone().add(30, "minutes")

  const isBetween = now.isBetween(startKorTime, endKorTime, "minutes", "[)")

  return isBetween
}

export function isAfterChatEndtime(startTime: string) {
  if (!startTime) return true

  const now = getKorDayjs(dayjs())

  const startKorTime = getKorDayjs(startTime)
  const endKorTime = startKorTime.clone().add(29, "minutes")

  return now.isAfter(endKorTime, "minutes")
}

export function isBeforeChatStartTime(startTime: string) {
  if (!startTime) return false

  const now = getKorDayjs(dayjs())

  const startKorTime = getKorDayjs(startTime)

  return now.isBefore(startKorTime, "minutes")
}

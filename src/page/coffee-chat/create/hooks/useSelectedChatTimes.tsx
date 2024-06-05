"use client"

import {
  SelectedChatTimesListSelector,
  SelectedChatTimesMapAtom,
} from "@/recoil/atoms/coffee-chat/date"
import { getChatPeriods } from "@/util/chat/time"
import dayjs from "dayjs"
import { uniqWith } from "lodash-es"
import { useRecoilState, useRecoilValue } from "recoil"
import utc from "dayjs/plugin/utc"

export function useSelectedChatTimes() {
  const [selectedChatTimesMap, setSelectedChatTimesMap] = useRecoilState(
    SelectedChatTimesMapAtom,
  )
  const selectedChatTimesListSelector = useRecoilValue(
    SelectedChatTimesListSelector,
  )

  const getSelectedChatTimesList = ({ key }: { key?: string } = {}) => {
    if (key) {
      dayjs.extend(utc)

      if (!selectedChatTimesMap) {
        return null
      }

      const pickTimes = selectedChatTimesMap[key]

      return pickTimes
        ? pickTimes.length
          ? [
              ...pickTimes.map((time) => {
                return dayjs(time as Date)
                  .utc()
                  .format()
              }),
            ]
          : null
        : null
    }

    return selectedChatTimesListSelector
  }

  const addPeriodToMap = (date: Date) => {
    const periods = getChatPeriods({
      startTime: dayjs(date).toString(),
    })

    const {
      chat: [chatStart, chatEnd],
    } = periods

    const entries = [
      [chatStart.format("YYYY-MM-DD"), []],
      [chatStart.add(1, "days").format("YYYY-MM-DD"), []],
      [chatEnd.format("YYYY-MM-DD"), []],
    ]

    const maps = Object.fromEntries(entries)

    setSelectedChatTimesMap((prev) => ({
      ...maps,
    }))
  }

  const addSelectedChatTime = ({ dateTime }: { dateTime: Date | Date[] }) => {
    if (Array.isArray(dateTime)) {
      setSelectedChatTimesMap((prev) => {
        const map = dateTime.reduce((acc, cur) => {
          const key = dayjs(cur).format("YYYY-MM-DD")

          if (key in acc) {
            const value = uniqWith([...acc[key], cur], (a, b) =>
              dayjs(a as Date).isSame(dayjs(b as Date)),
            ).sort((a, b) => dayjs(a as Date).diff(dayjs(b as Date)))

            acc[key] = value

            return acc
          }

          return {
            ...acc,
            [key]: [cur],
          }
        }, prev ?? ({} as any))

        return { ...map }
      })

      return
    }

    setSelectedChatTimesMap((prev) => {
      const key = dayjs(dateTime).format("YYYY-MM-DD")

      if (!prev || !Object.keys(prev).length) {
        return {
          [key]: [dateTime],
        }
      }

      if (key in prev) {
        const value = uniqWith([...prev[key], dateTime], (a, b) =>
          dayjs(a as Date).isSame(dayjs(b as Date)),
        ).sort((a, b) => dayjs(a as Date).diff(dayjs(b as Date)))

        return {
          ...prev,
          [key]: value,
        }
      }

      return {
        ...prev,
        [key]: [dateTime],
      }
    })
  }

  const removeSelectedChatTime = ({ dateTime }: { dateTime: Date }) => {
    setSelectedChatTimesMap((prev) => {
      const key = dayjs(dateTime).format("YYYY-MM-DD")
      const prevTarget = prev ? prev[key] : null

      if (!prevTarget) {
        return {
          ...prev,
        }
      }

      const value = prevTarget.filter(
        (chatTime) => !dayjs(chatTime as Date).isSame(dateTime),
      )

      return {
        ...prev,
        [key]: value,
      }
    })
  }

  const clear = ({ dateTime }: { dateTime?: Date } = {}) => {
    if (dateTime) {
      setSelectedChatTimesMap((prev) => {
        const key = dayjs(dateTime).format("YYYY-MM-DD")
        const prevTarget = prev && key in prev ? prev[key] : null

        if (!prevTarget) {
          return {
            ...prev,
          }
        }

        return {
          ...prev,
          [key]: [],
        }
      })

      return
    }

    setSelectedChatTimesMap(null)
  }

  // return
  const selectedChatTimeList = getSelectedChatTimesList()
  const count = getSelectedChatTimesList()?.length ?? 0

  return {
    addPeriodToMap,
    addSelectedChatTime,
    removeSelectedChatTime,
    clear,
    selectedChatTimeList,
    getSelectedChatTimesList,
    count,
  }
}

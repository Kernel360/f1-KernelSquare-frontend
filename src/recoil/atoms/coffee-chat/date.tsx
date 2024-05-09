import { Value } from "@/interfaces/calendar"
import { atom, selector } from "recoil"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

type SelectedDate = Value

type SelectedChatTimesMap = Record<string, Value[]>

export const MAXIMUM_SELCTE_CHAT_TIME_NUM = 10

export const ReservationSelectedDateAtom = atom<SelectedDate>({
  key: "chat-reservation-selected-date-atom",
  default: null,
})

export const SelectedChatTimesMapAtom = atom<SelectedChatTimesMap | null>({
  key: "selected-chat-times-map-atom",
  default: null,
})

export const SelectedChatTimesListSelector = selector<string[] | null>({
  key: "selected-chat-times-list-selector",
  get(opts) {
    dayjs.extend(utc)

    const timesMap = opts.get(SelectedChatTimesMapAtom)
    if (!timesMap) return null

    const timesList = Array.from(Object.values(timesMap)).flatMap(
      (time) => time,
    )
    if (!timesList?.length) return null

    return [
      ...timesList.map((time) => {
        return dayjs(time as Date)
          .utc()
          .format()
      }),
    ]
  },
})

export const SelectedDayTab = atom<SelectedDate | null>({
  key: "selected-day-tab-atom",
  default: null,
})

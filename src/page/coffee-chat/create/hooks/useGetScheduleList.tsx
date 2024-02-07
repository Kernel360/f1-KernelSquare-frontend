import {
  CoffeeChatStartDate,
  ScheduleListAtomFamily,
} from "@/recoil/atoms/coffee-chat/schedule"
import dayjs from "dayjs"
import { useRecoilValue, useSetRecoilState } from "recoil"
import utc from "dayjs/plugin/utc"

export const useGetScheduleList = (addNum: number) => {
  dayjs.extend(utc)
  const date = useRecoilValue(CoffeeChatStartDate)
  const targetDay = dayjs(date + "")
    .add(addNum, "day")
    .format("YYYY년MM월DD일")
  const targetList = useRecoilValue(ScheduleListAtomFamily(targetDay))
  return targetList.schedule.map((time) => {
    const DAY = dayjs(date + "")
      .add(addNum, "day")
      .format("YYYY-MM-DD")
    const dateTimeStr = `${DAY} ${time}`
    return `${dayjs(dateTimeStr).add(addNum, "day").utc().format()}`
  })
}

export const useSetScheduleList = (addNum: number) => {
  const date = useRecoilValue(CoffeeChatStartDate)
  const targetDay = dayjs(date + "")
    .add(addNum, "day")
    .format("YYYY년MM월DD일")
  return useSetRecoilState(ScheduleListAtomFamily(targetDay))
}

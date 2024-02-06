import {
  CoffeeChatStartDate,
  ScheduleListAtomFamily,
} from "@/recoil/atoms/coffee-chat/schedule"
import dayjs from "dayjs"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const useGetScheduleList = (addNum: number) => {
  const date = useRecoilValue(CoffeeChatStartDate)
  const targetDay = dayjs(date + "")
    .add(addNum, "day")
    .format("YYYY년MM월DD일")
  const targetList = useRecoilValue(ScheduleListAtomFamily(targetDay))
  return targetList.schedule.map(
    (time) =>
      `${dayjs(date + "")
        .add(addNum, "day")
        .format("YYYY-MM-DD")}T${time}:00`,
  )
}

export const useSetScheduleList = (addNum: number) => {
  const date = useRecoilValue(CoffeeChatStartDate)
  const targetDay = dayjs(date + "")
    .add(addNum, "day")
    .format("YYYY년MM월DD일")
  return useSetRecoilState(ScheduleListAtomFamily(targetDay))
}

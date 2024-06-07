import dayjs from "dayjs"
import { cloneDeep } from "lodash-es"

// 폼 제출 값으로 수정
export function transformDateTime(dateTimeFormat: string[]) {
  const dateTimes = cloneDeep(dateTimeFormat)
  dateTimes.sort((a, b) => dayjs(a).diff(b))

  return dateTimes.map((time) => time.replace(/Z$/g, ""))
}

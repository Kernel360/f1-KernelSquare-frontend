"use client"

import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"
import type { DayBoxProps } from "./DayBox.types"

const DayBox: React.FC<DayBoxProps> = ({ answer }) => {
  const now = dayjs().format()
  const isEdited = answer.created_date !== answer.modified_date

  return (
    <div className="max-h-[52px] flex flex-col justify-center">
      <div>
        {"답변일시: " +
          getKorRelativeTime({
            now,
            targetDate: isEdited ? answer.modified_date : answer.created_date,
          })}
      </div>
      <div className="flex flex-wrap justify-between">
        {isEdited && (
          <div className="text-right text-slate-400 my-1">(수정됨)</div>
        )}
      </div>
    </div>
  )
}

export default DayBox

"use client"

import type { Answer } from "@/interfaces/answer"
import { getKorRelativeTime } from "@/util/getDate"
import dayjs from "dayjs"

type UserInfoProps = {
  answer: Answer
}

const DayBox = ({ answer }: UserInfoProps) => {
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
      <div className="flex justify-between">
        {isEdited && <div className="text-right text-slate-400">(수정됨)</div>}
      </div>
    </div>
  )
}

export default DayBox

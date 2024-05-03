"use client"

import { Answer } from "@/interfaces/answer"
import { getKorRelativeTime } from "@/util/getDate"
import { twMerge } from "tailwind-merge"

interface AnswerDateProps {
  now: string
  answer: Answer
  className?: string
}

function AnswerDate({ now, answer, className }: AnswerDateProps) {
  const isModified = answer.modified_date !== answer.created_date

  const classNames = twMerge([
    "inline-block align-top self-center text-xs text-[#828282] font-medium",
    className,
  ])

  return (
    <div className={classNames}>
      <span>
        {getKorRelativeTime({
          now,
          targetDate: isModified ? answer.modified_date : answer.created_date,
        })}
      </span>
      {isModified ? <span> (수정됨)</span> : null}
    </div>
  )
}

export default AnswerDate

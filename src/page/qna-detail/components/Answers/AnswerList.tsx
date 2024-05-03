"use client"

import LightBulb from "@/components/shared/animation/LightBulb"
import { Answer } from "@/interfaces/answer"
import AnswerListItem from "./AnswerListItem"

interface AnswerListProps {
  answerList: Answer[]
  now: string
}

function AnswerList({ answerList, now }: AnswerListProps) {
  if (!answerList.length) {
    return (
      <div className="w-full border border-[#E0E0E0] rounded-lg flex flex-col gap-6 justify-center items-center py-6">
        <div className="w-[180px] min-h-[160px]">
          <LightBulb />
        </div>
        <div className="flex flex-col items-center text-sm text-[#828282]">
          <span>내 답변을 찾을 수 없습니다.</span>
          <span>당신의 의견을 듣고 싶어요! 어떤 생각이든 공유해주세요.</span>
        </div>
      </div>
    )
  }

  return (
    <ul>
      {answerList.map((answer) => (
        <AnswerListItem key={answer.answer_id} answer={answer} now={now} />
      ))}
    </ul>
  )
}

export default AnswerList

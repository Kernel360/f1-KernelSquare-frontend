"use client"

import type { Answer } from "@/interfaces/answer"
import Image from "next/image"
import { useClientSession } from "@/hooks/useClientSession"
import VoteBox from "./VoteBox"
import HandleAnswerBox from "./HandleAnswerBox"
import AnswerContentBox from "./AnswerContentBox"
import React from "react"
import { twMerge } from "tailwind-merge"
import AnswerAuthorInfo from "./info/AnswerAuthorInfo"
import AnswerDate from "./info/AnswerDate"

export interface AnswerListItemProps {
  answer: Answer
  now: string
}

const AnswerListItem: React.FC<AnswerListItemProps> = ({ answer, now }) => {
  const { user } = useClientSession()

  const voteWrapperClassName = twMerge([
    "absolute left-0 top-0",
    answer.rank_name && "top-10",
  ])

  const infoWrapperClassName = twMerge([
    "relative h-[60px] gap-x-6 w-[calc(100%-51px)] pc:w-[calc(100%-62px)] pl-4 tabletDevice:pl-6 pc:pl-6 ml-12 pc:ml-[62px] flex justify-between flex-wrap",
    answer.rank_name && "mt-4",
  ])

  const answerMenuWrapperClassName = twMerge([
    "@container absolute z-[3] -top-[24px] w-[calc(100%-32px)]",
    answer.rank_name && "-top-[22px]",
  ])

  return (
    <div
      className={
        "border-b-[1px] border-b-gray [&:first-child]:pb-[14px] [&:not(:first-child)]:pt-6 [&:not(:first-child)]:pb-[14px]"
      }
    >
      <div className="relative">
        <Rank
          rank_name={answer.rank_name}
          rank_image_url={answer.rank_image_url}
        />
        <div className={voteWrapperClassName}>
          <VoteBox userId={user?.member_id} answer={answer} />
        </div>
        <div className={infoWrapperClassName}>
          <div className="max-w-full self-start flex gap-x-4 gap-y-1 flex-wrap">
            <AnswerAuthorInfo answer={answer} />
            <AnswerDate now={now} answer={answer} />
          </div>
          <div className={answerMenuWrapperClassName}>
            <HandleAnswerBox answer={answer} />
          </div>
        </div>
        <div className="w-full mt-4 pl-0 sm:-mt-[22px] tabletDevice:pl-6 pc:pl-6 tabletDevice:w-[calc(100%-48px)] pc:w-[calc(100%-62px)] tabletDevice:ml-12 pc:ml-[62px]">
          <AnswerContentBox answer={answer} />
        </div>
      </div>
    </div>
  )
}

export default AnswerListItem

const Rank = ({
  rank_name,
  rank_image_url,
}: Pick<Answer, "rank_name" | "rank_image_url">) => {
  if (!rank_name) return null

  return (
    <div className="rounded-lg bg-[#EAF7F0] flex items-center gap-0.5 px-2 py-1 justify-center">
      {rank_image_url ? (
        <div className="relative w-4 h-4">
          <Image
            src={rank_image_url}
            alt="level image"
            style={{ objectFit: "contain" }}
            fill
          />
        </div>
      ) : null}
      <span className="text-xs font-medium">{rank_name}등 답변입니다.</span>
    </div>
  )
}

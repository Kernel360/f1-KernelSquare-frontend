"use client"

import type { Answer } from "@/interfaces/answer"
import Image from "next/image"
import useQnADetail from "../../hooks/useQnADetail"
import { useClientSession } from "@/hooks/useClientSession"
import VoteBox from "./VoteBox"
import HandleAnswerBox from "./HandleAnswerBox"
import DayBox from "./DayBox"
import AnswerContentBox from "./AnswerContentBox"
import { Icons } from "@/components/icons/Icons"
import React from "react"
import type { OneAnswerProps } from "./OneAnswer.types"

const OneAnswer: React.FC<OneAnswerProps> = ({ answer, createdby }) => {
  const { ProgressModalView } = useQnADetail({ questionId: answer.question_id })
  const { user } = useClientSession()

  return (
    <div className="border-b-[1px] border-b-gray my-5">
      <div className="flex justify-between flex-wrap">
        <VoteBox userId={user?.member_id} answer={answer} />
        <AnswerContentBox answer={answer} />
      </div>
      <div className="flex flex-wrap justify-end my-5">
        <DayBox answer={answer} />
        <MemoizedProfileImageBox answer={answer} />
        <MemoizedUserInfoBox answer={answer} />
      </div>
      <HandleAnswerBox createdby={createdby} answer={answer} />
      <ProgressModalView />
    </div>
  )
}

export default OneAnswer

const UserInfoBox: React.FC<{ answer: Answer }> = ({ answer }) => {
  return (
    <div className="ml-[20px] text-center">
      <div className="px-2 bg-[#F3EDC8] rounded-md mb-1">
        {answer.created_by}
      </div>
      <div className="text-center flex flex-wrap justify-center">
        <div className="ml-1">Lv.{answer.author_level}</div>
        {answer.rank_image_url && (
          <div className="flex flex-col justify-center">
            <Image
              src={answer.rank_image_url}
              alt="답변자 배지 이미지"
              width={20}
              height={20}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const ProfileImageBox: React.FC<{ answer: Answer }> = ({ answer }) => {
  if (answer.member_image_url)
    return (
      <div className="ml-[20px] w-[50px] h-[50px] relative my-3">
        <Image
          src={answer.member_image_url}
          alt="답변자 프로필 이미지"
          fill
          className="object-cover rounded-full cursor-pointer"
          // onClick={() => router.push(`/profile/${answer.=}`)}
        />
      </div>
    )

  // 사용자 프로필 이미지 없을 경우
  return (
    <Icons.UserProfile className="ml-[20px] w-[50px] h-[50px] fill-colorsGray shrink-0" />
  )
}

const MemoizedUserInfoBox = React.memo(UserInfoBox)
const MemoizedProfileImageBox = React.memo(ProfileImageBox)

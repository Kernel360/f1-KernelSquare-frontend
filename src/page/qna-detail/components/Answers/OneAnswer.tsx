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
import { SessionPayload } from "@/recoil/atoms/user"
import { twJoin } from "tailwind-merge"
import { useRouter } from "next/navigation"

export interface OneAnswerProps {
  answer: Answer
  createdby: string
}

const OneAnswer: React.FC<OneAnswerProps> = ({ answer, createdby }) => {
  const { ProgressModalView } = useQnADetail()
  const { user } = useClientSession()

  return (
    <div className="border-b-[1px] border-b-gray my-5">
      <div className="flex justify-between flex-wrap">
        <VoteBox userId={user?.member_id} answer={answer} />
        <AnswerContentBox answer={answer} />
      </div>
      <div className="flex flex-wrap justify-end my-5">
        <DayBox answer={answer} />
        <MemoizedProfileImageBox answer={answer} user={user} />
        <MemoizedUserInfoBox answer={answer} user={user} />
      </div>
      <HandleAnswerBox createdby={createdby} answer={answer} />
      <ProgressModalView />
    </div>
  )
}

export default OneAnswer

const classUponAuthorization = (isUser: boolean, className: string) =>
  twJoin(className, [isUser && "cursor-pointer"])

type BoxProps = {
  answer: Answer
  user: SessionPayload
}

const UserInfoBox: React.FC<BoxProps> = ({ answer, user }) => {
  const { push } = useRouter()
  const handleRouting = (answer_member_id: number) => {
    if (!user) return
    push(`/profile/${answer_member_id}`)
  }

  return (
    <div className="ml-[20px] text-center">
      <div
        className={classUponAuthorization(
          !!user,
          "px-2 bg-[#F3EDC8] rounded-md mb-1",
        )}
        onClick={() => handleRouting(answer.answer_member_id)}
      >
        {answer.created_by}
      </div>
      <div className="text-center flex flex-wrap justify-center">
        <div className="ml-1">Lv.{answer.author_level}</div>
        {answer.rank_image_url && (
          <div className="flex flex-col justify-center ml-1">
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

const ProfileImageBox: React.FC<BoxProps> = ({ answer, user }) => {
  const { push } = useRouter()
  const handleRouting = (answer_member_id: number) => {
    if (!user) return
    push(`/profile/${answer_member_id}`)
  }
  if (answer.member_image_url)
    return (
      <div
        className={classUponAuthorization(
          !!user,
          "ml-[20px] w-[50px] h-[50px] relative",
        )}
        onClick={() => handleRouting(answer.answer_member_id)}
      >
        <Image
          src={answer.member_image_url}
          alt="답변자 프로필 이미지"
          fill
          className="object-cover rounded-full cursor-pointer"
        />
      </div>
    )

  // 사용자 프로필 이미지 없을 경우
  return (
    <Icons.UserProfile
      className={classUponAuthorization(
        !!user,
        "ml-[20px] w-[50px] h-[50px] fill-colorsGray shrink-0",
      )}
      onClick={() => handleRouting(answer.answer_member_id)}
    />
  )
}

const MemoizedUserInfoBox = React.memo(UserInfoBox)
const MemoizedProfileImageBox = React.memo(ProfileImageBox)

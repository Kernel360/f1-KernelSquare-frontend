"use client"

import Profile from "@/components/shared/user/Profile"
import { useClientSession } from "@/hooks/useClientSession"
import { Answer } from "@/interfaces/answer"
import { useRouter } from "next/navigation"

interface UserInfoProps {
  answer: Answer
}

function AnswerAuthorInfo({ answer }: UserInfoProps) {
  const { push } = useRouter()

  const { user: loginUser } = useClientSession()

  const goToUserProfile =
    (id: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      push(`/profile/${id}`)
    }

  return (
    <div
      className={`relative max-w-[inherit] inline-flex align-top flex-shrink-0 outline outline-2 outline-offset-2 outline-transparent rounded-lg ${
        loginUser ? "cursor-pointer hover:outline-primary" : "cursor-default"
      }`}
      {...(loginUser && {
        onClick: goToUserProfile(answer.answer_member_id),
        title: "유저 프로필로 이동",
      })}
    >
      <div className="flex gap-2 items-center">
        <Profile
          profileImage={answer.member_image_url}
          className={`shrink-0 ${
            loginUser ? "cursor-pointer" : "cursor-default"
          }`}
          initialProfileClassName="text-[32px]"
        />
        <span className="font-semibold text-sm shrink-0">
          {answer.member_nickname}
        </span>
        <div className="flex gap-1 items-center">
          <div className="text-sm">
            LV.<span>{answer.author_level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerAuthorInfo

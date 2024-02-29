"use client"

import Profile from "@/components/shared/Profile"
import { useClientSession } from "@/hooks/useClientSession"
import { CodingMeetingAuthor } from "@/interfaces/coding-meetings"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface UserInfoProps {
  user: CodingMeetingAuthor
}

function UserInfo({ user }: UserInfoProps) {
  const { user: loginUser } = useClientSession()

  const { push } = useRouter()

  const goToUserProfile =
    (id: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      push(`/profile/${id}`)
    }
  return (
    <div
      className={`cursor-pointer inline-flex align-top flex-shrink-0 outline outline-2 outline-offset-2 outline-transparent rounded-lg ${
        loginUser ? "hover:outline-primary" : ""
      }`}
      {...(loginUser && {
        onClick: goToUserProfile(user.member_id),
        title: "유저 프로필로 이동",
      })}
    >
      <div className="flex gap-2 items-center">
        <Profile profileImage={user.member_profile_url} />
        <span className="font-semibold text-sm">{user.member_nickname}</span>
        <div className="flex gap-1 items-center">
          <div className="relative w-4 h-4">
            <Image
              src={user.member_level_image_url}
              alt="level image"
              style={{ objectFit: "contain" }}
              fill
            />
          </div>
          <div className="text-sm">
            LV.<span>{user.member_level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo

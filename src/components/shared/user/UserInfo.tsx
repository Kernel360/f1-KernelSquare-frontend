"use client"

import { useClientSession } from "@/hooks/useClientSession"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Profile from "./Profile"

export interface UserProfileInfo {
  id: number
  level: number
  nickname: string
  profileImageUrl: string | null
  levelImageUrl: string
}

interface UserInfoProps {
  user: UserProfileInfo
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
      className={`inline-flex align-top flex-shrink-0 outline outline-2 outline-offset-2 outline-transparent rounded-lg ${
        loginUser ? "cursor-pointer hover:outline-primary" : "cursor-default"
      }`}
      {...(loginUser && {
        onClick: goToUserProfile(user.id),
        title: "유저 프로필로 이동",
      })}
    >
      <div className="flex gap-2 items-center">
        <Profile
          profileImage={user.profileImageUrl}
          className={`shrink-0 ${
            loginUser ? "cursor-pointer" : "cursor-default"
          }`}
        />
        <span className="font-semibold text-sm">{user.nickname}</span>
        <div className="flex gap-1 items-center">
          <div className="relative w-4 h-4">
            <Image
              src={user.levelImageUrl}
              alt="level image"
              style={{ objectFit: "contain" }}
              fill
            />
          </div>
          <div className="text-sm">
            LV.<span>{user.level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo

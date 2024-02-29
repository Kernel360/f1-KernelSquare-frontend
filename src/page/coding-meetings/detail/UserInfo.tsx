"use client"

import Profile from "@/components/shared/Profile"
import { CodingMeetingAuthor } from "@/interfaces/coding-meetings"
import Image from "next/image"

interface UserInfoProps {
  user: CodingMeetingAuthor
}

function UserInfo({ user }: UserInfoProps) {
  return (
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
  )
}

export default UserInfo

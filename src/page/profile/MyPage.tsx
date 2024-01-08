"use client"

import Image from "next/image"
import ProfileImage from "./components/ProfileImage"
import ExperiencePoint from "./components/ExperiencePoint"
import { basic_profile } from "@/assets/images/basic"
import badge_url from "@/assets/images/badges"
import Introduction from "./components/Introduction"
import { twMerge } from "tailwind-merge"
import { useClientSession } from "@/hooks/useClientSession"

// 아이디 값 관련 로직 수정 예정
function MyPage() {
  const { user } = useClientSession()

  if (user)
    return (
      <div className="max-w-[60%] m-auto mt-[50px]">
        <div className="w-full flex justify-evenly mb-[50px]">
          <ProfileImage
            id={user.member_id}
            image_url={
              user.image_url && typeof user.image_url === "string"
                ? user.image_url
                : basic_profile
            }
          />
          <div className="flex items-center">
            <div>
              <Image
                src={badge_url[user.level]}
                alt="배지 이미지"
                width={50}
                height={50}
              />
              <div className="text-center">level {user.level}</div>
            </div>
            <div className="font-bold text-[48px] ml-[20px]">
              {user.nickname}
            </div>
          </div>
        </div>
        <ExperiencePoint level={user.level} exp={user.experience} />
        <Divider className="mb-[50px]" />
        <Introduction introduction={user.introduction} id={user.member_id} />
        <Divider />
      </div>
    )
}

export default MyPage

interface DividerProps {
  className?: string
}

function Divider({ className }: DividerProps) {
  const classMerged = twMerge(["h-[3px] bg-slate-400 w-full", className])
  return <div className={classMerged}></div>
}

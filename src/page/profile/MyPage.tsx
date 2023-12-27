"use client"

import Image from "next/image"
import ProfileImage from "./components/ProfileImage"
import ExperiencePoint from "./components/ExperiencePoint"
import { basic_profile } from "@/assets/images/basic"
import badge_url from "@/assets/images/badges"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { memberQueries } from "@/react-query/member"
import Introduction from "./components/Introduction"
import { useEffect } from "react"

// 아이디 값 관련 로직 수정 예정
function MyPage() {
  const {
    data: member,
    isPending,
    refetch,
  } = memberQueries.useMemberData({ id: 2 })

  useEffect(() => {
    refetch()
  }, [])

  if (isPending) return <Loading />

  if (member)
    return (
      <div className="max-w-[60%] m-auto mt-[50px]">
        <div className="w-full flex justify-evenly mb-[50px]">
          <ProfileImage
            image_url={
              member.image_url && typeof member.image_url === "string"
                ? member.image_url
                : basic_profile
            }
          />
          <div className="flex items-center">
            <div>
              <Image
                src={badge_url[member.level]}
                alt="배지 이미지"
                width={50}
                height={50}
              />
            </div>
            <div className="font-bold text-[48px] ml-[20px]">
              {member.nickname}
            </div>
          </div>
        </div>
        <ExperiencePoint level={member.level} exp={member.experience} />
        <Divider />
        <Introduction introduction={member.introduction} />
        <Divider />
      </div>
    )
}

export default MyPage

function Divider() {
  return <div className="bg-slate-400 h-[1px] w-full mb-[50px]"></div>
}

function Loading() {
  return (
    <div className="h-full">
      <ContentLoading
        style={{
          width: "calc(100% - 80px)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      />
    </div>
  )
}

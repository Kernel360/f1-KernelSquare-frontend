"use client"

import Image from "next/image"
import ProfileImage from "./components/ProfileImage"
import ExperiencePoint from "./components/ExperiencePoint"
import { basic_profile } from "@/assets/images/basic"
import badge_url from "@/assets/images/badges"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import Introduction from "./components/Introduction"
import { useEffect } from "react"
import { useUser } from "@/hooks/useUser"
import { twMerge } from "tailwind-merge"

// 아이디 값 관련 로직 수정 예정
function MyPage() {
  const { data: member, refetch, isPending } = useUser()
  console.log("useuser", member?.data)

  useEffect(() => {
    refetch()
  }, [])

  if (isPending) return <Loading />

  if (member?.data.data)
    return (
      <div className="max-w-[60%] m-auto mt-[50px]">
        <div className="w-full flex justify-evenly mb-[50px]">
          <ProfileImage
            id={member?.data.data.id}
            image_url={
              member?.data.data.image_url &&
              typeof member?.data.data.image_url === "string"
                ? member?.data.data.image_url
                : basic_profile
            }
          />
          <div className="flex items-center">
            <div>
              <Image
                src={badge_url[member?.data.data.level]}
                alt="배지 이미지"
                width={50}
                height={50}
              />
            </div>
            <div className="font-bold text-[48px] ml-[20px]">
              {member?.data.data.nickname}
            </div>
          </div>
        </div>
        <ExperiencePoint
          level={member?.data.data.level}
          exp={member?.data.data.experience}
        />
        <Divider className="mb-[50px]" />
        <Introduction
          introduction={member?.data.data.introduction}
          id={member?.data.data.id}
        />
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

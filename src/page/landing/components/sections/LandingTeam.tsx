"use client"

import Spacing from "@/components/shared/Spacing"
import LandingContainer from "../LandingContainer"
import TeamKernelSqaure from "@/constants/landing"
import { Icons } from "@/components/icons/Icons"
import Image from "next/image"
import { useRef } from "react"
import useHeaderObserver from "../../hooks/useHeaderObserver"

const LandingTeam = () => {
  const teamRef = useRef<HTMLDivElement>(null)

  useHeaderObserver({ ref: teamRef, keyword: "team", threshold: 0.4 })

  const handleGithub = (url?: string) => {
    if (!url) return
    window.open(url)
  }

  return (
    <LandingContainer
      ref={teamRef}
      className="w-full m-auto text-center flex flex-col justify-center gap-5"
    >
      <div
        className="text-center"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className="text-primary text-4xl font-bold">
          Team Kernel Square
        </div>
        <div className="text-2xl">커널 스퀘어를 만들어가는 사람들</div>
      </div>
      <Spacing size={10} />
      <div
        className="flex justify-center gap-10"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {TeamKernelSqaure.slice(0, 3).map(
          ({ name, profile, role, github }, i) => (
            <div
              className="flex flex-col items-center justify-between gap-2"
              key={name}
            >
              <div
                className="relative w-[100px] h-[100px] rounded-full overflow-hidden [&_svg]:w-[100px] [&>svg]:h-[100px]"
                onClick={() => handleGithub(github)}
              >
                <ProfileImage profile={profile} />
              </div>
              <div className="font-bold text-base">{name}</div>
              {!i && <div className="text-xs">Team Leader</div>}
              <div className="text-xs">{role}</div>
            </div>
          ),
        )}
      </div>
      <Spacing size={10} />
      <div
        className="flex justify-center gap-10"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {TeamKernelSqaure.slice(3).map(({ name, profile, role, github }, i) => (
          <div
            className="flex flex-col items-center justify-between gap-2"
            key={name}
          >
            <div
              className="relative w-[100px] h-[100px] rounded-full overflow-hidden [&_svg]:w-[100px] [&>svg]:h-[100px]"
              onClick={() => handleGithub(github)}
            >
              <ProfileImage profile={profile} />
            </div>
            <div className="font-bold text-base">{name}</div>
            <div className="text-xs">{role}</div>
          </div>
        ))}
      </div>
    </LandingContainer>
  )
}

export default LandingTeam

type ProfileImageProps = {
  profile?: string
}

const ProfileImage = ({ profile }: ProfileImageProps) => {
  if (!profile)
    return <Icons.UserProfile className="absolute text-colorsGray bg-white" />
  return (
    <Image
      src={profile}
      alt="프로필 사진"
      fill
      priority
      sizes="auto"
      style={{ objectFit: "cover", objectPosition: "center" }}
      className="cursor-pointer"
    />
  )
}

"use client"

import Image from "next/image"
import LandingContainer from "./components/LandingContainer"
import LandingHeader from "./components/LandingHeader"
import LandingSearchBar from "./components/LandingSearchBar"
import { Icons } from "@/components/icons/Icons"
import TeamKernelSqaure from "@/constants/team"
import Spacing from "@/components/shared/Spacing"

const LandingPage: React.FC = () => {
  const handleGithub = (url?: string) => {
    if (!url) return
    window.open(url)
  }
  return (
    <div>
      <div>
        <video
          width={"100%"}
          height={"100vh"}
          preload="auto"
          autoPlay
          muted
          loop
          className="object-cover h-screen w-full grayscale-[50%] contrast-[90%] brightness-50"
        >
          <source src="/video/landing_video.webm" type="video/webm" />
          <source src="/video/landing_video.mp4" type="video/mp4" />
        </video>
        <LandingHeader />
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center text-center">
          <div className="font-bold text-[36px] sm:text-5xl text-white">
            지속 가능한 개발자 커뮤니티,
          </div>
          <div className="text-[60px] sm:text-[90px] font-black text-primary italic">
            Kernel Square
          </div>
          <LandingSearchBar />
        </div>
      </div>
      <LandingContainer>
        <div>프로젝트 소개</div>
      </LandingContainer>
      <LandingContainer>
        <div>개발자 QnA</div>
      </LandingContainer>
      <LandingContainer>
        <div>커피챗</div>
      </LandingContainer>
      <LandingContainer>
        <div>모각코</div>
      </LandingContainer>
      <LandingContainer className="w-full m-auto text-center flex flex-col justify-center gap-5">
        <div className="text-primary text-4xl font-bold">
          Team Kernel Square
        </div>
        <div className="text-2xl">커널 스퀘어를 만들어가는 사람들</div>
        <Spacing size={10} />
        <div className="flex justify-center gap-10">
          {TeamKernelSqaure.slice(0, 4).map(
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
        <div className="flex justify-center gap-10">
          {TeamKernelSqaure.slice(4).map(
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
                <div className="text-xs">{role}</div>
              </div>
            ),
          )}
        </div>
      </LandingContainer>
      <LandingContainer>
        <div>성장에 가까워지기</div>
      </LandingContainer>
    </div>
  )
}

export default LandingPage

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
      style={{ objectFit: "cover", objectPosition: "center" }}
      className="cursor-pointer"
    />
  )
}

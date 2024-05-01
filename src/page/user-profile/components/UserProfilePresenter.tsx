"use client"

import Spacing from "@/components/shared/Spacing"
import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import Image from "next/image"
import { PropsWithChildren, useEffect, useRef } from "react"
import UserProfileSection from "./UserProfileSection"
import UserProfileMenu from "./UserProfileMenu"
import badge_url from "@/assets/images/badges"
import levelStandard from "@/constants/levelStandard"
import ProfileImage from "./profileImage/ProfileImage"
import { basic_profile_background } from "@/assets/images/basic"
import UserProfileDropdown from "./UserProfileDropdownMenu"
import { useClientSession } from "@/hooks/useClientSession"

interface UserProfilePresenterProps {
  userPayload: UserPayload
}

interface ProfileImageWrapperProps {
  userPayload: UserPayload
}

function UserProfilePresenter({ userPayload }: UserProfilePresenterProps) {
  return (
    <UserProfilePresenter.Container>
      <UserProfilePresenter.BackgroundSection />
      <UserProfilePresenter.UserInfo userPayload={userPayload} />
      <div className="sm:hidden relative h-9 box-border w-[calc(100%-32px)] mx-auto bg-gradient-to-b from-white/0 from-[10%] to-white" />
      <UserProfilePresenter.ContentWrapper>
        {/* 실제 content */}
        <UserProfileMenu userPayload={userPayload} />
      </UserProfilePresenter.ContentWrapper>
    </UserProfilePresenter.Container>
  )
}

export default UserProfilePresenter

UserProfilePresenter.Container = function UserProfileContainer({
  children,
}: NonNullable<PropsWithChildren>) {
  return (
    <div className="relative min-h-screen h-max pb-4 sm:flex sm:px-4 sm:flex-wrap sm:content-start">
      {children}
    </div>
  )
}

UserProfilePresenter.BackgroundSection =
  function UserProfileBackgroundSection() {
    return (
      <div className="relative w-full h-0 pb-36 sm:aspect-video sm:max-h-[400px] sm:h-fit bg-colorsLightGray">
        <Image
          src={basic_profile_background}
          alt="bg"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    )
  }

UserProfilePresenter.UserInfo = function UserProfileInfo({
  userPayload,
}: {
  userPayload: UserPayload
}) {
  return (
    <ProfileImageWrapper userPayload={userPayload}>
      <ProfileImage
        user_id={userPayload.member_id}
        image_url={userPayload.image_url}
      />
    </ProfileImageWrapper>
  )
}

function ProfileImageWrapper({
  children,
  userPayload,
}: PropsWithChildren<ProfileImageWrapperProps>) {
  const { user } = useClientSession()

  return (
    <div className="w-full flex flex-col justify-center items-center sticky [margin-block-start:-60px] sm:[margin-block-start:-88px] sm:h-max sm:min-h-[200px] sm:justify-start top-[calc(var(--height-header)+16px)] tabletDevice:top-[calc(var(--height-header)+60px)] pc:top-[--height-header] sm:w-max sm:box-border sm:pt-4 sm:-translate-x-[7px]">
      {children}
      <div className="flex flex-col w-full justify-center items-center">
        <Spacing size={16} />
        <div className="text-4xl text-secondary font-semibold px-4 sm:px-0 sm:max-w-[120px] lg:max-w-[250px] break-all">
          {userPayload.nickname}
        </div>
      </div>
      <UserProfilePresenter.Grade userPayload={userPayload} />
      {user?.nickname === userPayload.nickname ? <UserProfileDropdown /> : null}
    </div>
  )
}

UserProfilePresenter.ContentWrapper = function UserProfileContentWrapper({
  children,
}: PropsWithChildren) {
  return (
    <>
      <div className="relative box-border px-4 z-[1] bg-white sm:flex-1">
        {children}
      </div>
    </>
  )
}

UserProfilePresenter.Grade = function UserProfileGrade({
  userPayload,
}: {
  userPayload: UserPayload
}) {
  return (
    <UserProfileSection className="border-transparent relative z-[1] bg-white shadow-none w-full">
      <div className="flex flex-row w-full items-center gap-4 bg-white rounded-lg p-4 shadow-md max-w-xs mx-auto sm:items-center sm:flex-col">
        <div className="flex flex-col w-max justify-center items-center">
          <div className="relative w-5 h-5">
            <Image
              src={badge_url[userPayload.level]}
              alt={"level"}
              fill
              style={{ objectFit: "scale-down", objectPosition: "center" }}
            />
          </div>
          <span className="font-bold text-secondary">
            LV.{userPayload.level}
          </span>
        </div>
        <UserProfilePresenter.Experience
          level={userPayload.level}
          experience={userPayload.experience}
        />
      </div>
    </UserProfileSection>
  )
}

UserProfilePresenter.Experience = function UserProfileExperience({
  experience,
  level,
}: Pick<UserPayload, "experience" | "level">) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref?.current) return

    const timeId = setTimeout(() => {
      if (!ref.current) return

      ref.current.style.width = `${getExperienceProgressRate()}%`
    }, 0)

    function getExperienceProgressRate() {
      const experienceGoal = levelStandard[level] as number

      return (experience / experienceGoal) * 100
    }

    return () => {
      if (timeId) {
        clearTimeout(timeId)
      }
    }
  }, [experience, level])

  return (
    <div className="flex w-full max-w-full">
      <div className="relative w-full h-2 rounded-[4px] overflow-hidden">
        <div className="absolute w-full h-full left-0 top-0 bg-colorsGray" />
        <div
          ref={ref}
          className="transition-[width] duration-1000 absolute w-0 h-full left-0 top-0 bg-[#1ec981]"
          style={{ width: `0px` }}
        />
      </div>
    </div>
  )
}

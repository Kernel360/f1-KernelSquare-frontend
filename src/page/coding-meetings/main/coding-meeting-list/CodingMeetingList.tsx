"use client"

import Profile from "@/components/shared/Profile"
import Spacing from "@/components/shared/Spacing"
import ListLoading from "@/components/shared/animation/ListLoading"
import NoContent from "@/components/shared/animation/NoContent"
import Button from "@/components/shared/button/Button"
import HashTag from "@/components/shared/tag/HashTag"
import { useClientSession } from "@/hooks/useClientSession"
import { GetCodingMeetingListResponse } from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import {
  getCollapsedDate,
  getKorDayjs,
  getKorRelativeTime,
} from "@/util/getDate"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { twJoin } from "tailwind-merge"

interface CodingMeetingListProps {
  codingMeetings: NonNullable<GetCodingMeetingListResponse["data"]>["list"]
}

function CodingMeetingList({ codingMeetings }: CodingMeetingListProps) {
  const { user } = useClientSession()

  const { push } = useRouter()

  const now = dayjs().format()

  const detailHref = (token: string) => {
    return `/coding-meetings/${token}`
  }

  const goToUserProfile =
    (id: number) => (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      push(`/profile/${id}`)
    }

  const goToCodingMeetingDetail =
    (token: string) => (e: React.MouseEvent<HTMLLIElement>) => {
      push(detailHref(token))
    }

  return (
    <div className="w-full mx-auto">
      <ul className="flex flex-col gap-4">
        {codingMeetings.map(
          ({
            member_id,
            member_profile_url,
            member_nickname,
            member_level,
            member_level_image_url,
            created_date,
            coding_meeting_token,
            coding_meeting_closed,
            coding_meeting_title,
            coding_meeting_start_time,
            coding_meeting_end_time,
            coding_meeting_hashtags,
          }) => {
            return (
              <li
                key={coding_meeting_token}
                className="cursor-pointer p-6 border border-colorsGray rounded-lg transition-shadow hover:shadow-md"
                onClick={goToCodingMeetingDetail(coding_meeting_token)}
              >
                <section className="flex flex-col gap-2 tablet:flex-row">
                  <CodingMeetingList.OpenStatusTag
                    isClosed={coding_meeting_closed}
                  />
                  <h3 className="w-fit">
                    <Link
                      href={detailHref(coding_meeting_token)}
                      className="max-w-full line-clamp-2 text-ellipsis text-blue-400"
                    >
                      {coding_meeting_title}
                    </Link>
                  </h3>
                </section>
                <section className="flex gap-4 mt-2 mb-4 tablet:mb-6">
                  <h4 className="text-[#828282] text-sm w-max shrink-0">
                    일시
                  </h4>
                  <time className="text-[#333333] text-sm font-medium">
                    {getCollapsedDate({
                      start: coding_meeting_start_time,
                      end: coding_meeting_end_time,
                    })}
                  </time>
                </section>
                <section className="flex flex-col justify-between items-start tablet:flex-row tablet:items-center">
                  <ul className="w-full tablet:w-[50%] flex gap-2 flex-wrap">
                    {coding_meeting_hashtags?.length
                      ? coding_meeting_hashtags.map((hashtag) => (
                          <HashTag key={hashtag}>{hashtag}</HashTag>
                        ))
                      : ""}
                  </ul>
                  <div className="ml-0 mt-2 tablet:ml-[5%] tablet:mt-0 w-full tablet:w-[45%] flex gap-4 justify-start tablet:justify-end items-center">
                    <div
                      className={`flex gap-2 justify-center items-center outline outline-[2px] outline-transparent transition-colors ${
                        user
                          ? "hover:outline-primary outline-offset-4 rounded-lg pointer-events-auto"
                          : "pointer-events-none"
                      }`}
                      {...(user && {
                        onClick: goToUserProfile(member_id),
                        title: "유저 프로필로 이동",
                      })}
                    >
                      <Profile
                        profileImage={member_profile_url}
                        className="shrink-0"
                      />
                      <span className="w-max max-w-none tablet:max-w-[52px] xl:max-w-none break-all font-semibold text-sm text-black">
                        {member_nickname}
                      </span>
                      <div className="flex gap-1 items-center">
                        <div className="relative w-4 h-4">
                          <Image
                            src={member_level_image_url}
                            alt="level image"
                            style={{ objectFit: "contain" }}
                            fill
                          />
                        </div>
                        <div className="text-sm">
                          LV.<span>{member_level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-sm text-[#828282] w-max shrink-0">
                      {getKorRelativeTime({ now, targetDate: created_date })}
                    </div>
                  </div>
                </section>
              </li>
            )
          },
        )}
      </ul>
    </div>
  )
}

export default CodingMeetingList

CodingMeetingList.OpenStatusTag = function CodingMeetingListOpenStatusTag({
  isClosed,
}: {
  isClosed: boolean
}) {
  const classNames = twJoin([
    "w-fit h-fit shrink-0 text-xs px-2 py-1 rounded-full",
    isClosed ? "bg-[#E0E0E0] text-colorsDarkGray" : "bg-primary text-white",
  ])

  return <div className={classNames}>{isClosed ? "마감됨" : "모집중"}</div>
}

CodingMeetingList.NotHasQnAContent = function CodingMeetingListNotHasContent({
  type = "noContent",
}: {
  type: "noPage" | "noContent"
}) {
  const { push } = useRouter()

  const goToList = () => {
    push(`/coding-meetings?page=0&size=10&filter=all`)
  }

  return (
    <div className="flex flex-1 justify-center items-center box-border p-4 h-[200px]">
      <div className="flex flex-col justify-center items-center">
        <NoContent />
        <h3>
          {type === "noContent"
            ? "일치하는 모임을 찾을 수 없습니다"
            : "요청한 페이지를 찾을 수 없습니다"}
        </h3>
        <Spacing size={16} />
        <Button buttonTheme="primary" onClick={goToList}>
          모각코 전체 목록보기
        </Button>
      </div>
    </div>
  )
}

CodingMeetingList.Loading = function CodingMeetingListLoading() {
  return (
    <div className="relative">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          모각코 리스트
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ListLoading
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "300px",
            margin: "0 auto",
            opacity: "0.5",
          }}
        />
      </div>
    </div>
  )
}

"use client"

import ListLoading from "@/components/shared/animation/ListLoading"
import NoContent from "@/components/shared/animation/NoContent"
import { useClientSession } from "@/hooks/useClientSession"
import dayjs from "dayjs"
import Link from "next/link"
import Profile from "@/components/shared/Profile"
import Image from "next/image"
import Tag from "@/components/shared/tag/Tag"
import { getKorRelativeTime } from "@/util/getDate"
import { FaHashtag } from "react-icons/fa"
import Spacing from "@/components/shared/Spacing"
import type { CoffeeChatReservationListPayload } from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"
import HashTag from "@/components/shared/tag/HashTag"

interface CoffeeChatListProps {
  coffeeChatList: CoffeeChatReservationListPayload["list"]
}

function CoffeeChatList({ coffeeChatList }: CoffeeChatListProps) {
  const { user } = useClientSession()

  const now = dayjs().format()

  return (
    <ul className="flex flex-col gap-8 lgDevice:grid lgDevice:grid-cols-2">
      {coffeeChatList.map(
        ({
          article_id,
          title,
          nickname,
          member_id,
          member_image_url,
          level,
          level_image_url,
          hash_tag_list,
          full_check,
          created_date,
          modified_date,
        }) => {
          return (
            <li
              key={article_id}
              className={`shadow-sm hover:shadow-md transition-shadow max-w-full box-border border border-colorsGray rounded-lg p-2`}
            >
              <div className="flex gap-1">
                <div className="flex flex-col items-center py-1">
                  <Profile
                    profileImage={member_image_url}
                    className="align-top m-0.5 cursor-default"
                  />
                  <div className="flex flex-col items-center w-[90px]">
                    <div className="text-sm">{nickname}</div>
                    <div className="inline-flex align-top items-center">
                      <div className="relative w-5 h-5">
                        <Image
                          src={level_image_url}
                          alt={`level badge`}
                          fill
                          style={{
                            objectFit: "scale-down",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                      <span className="text-xs">LV.{level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="w-fit">
                    <Link
                      href={`/chat/${article_id}`}
                      className="max-w-full line-clamp-2 text-ellipsis text-blue-400"
                    >
                      {title}
                    </Link>
                  </h3>
                </div>
                <div className="w-max self-end">
                  {getKorRelativeTime({ now, targetDate: created_date })}
                </div>
              </div>
              <Spacing size={12} />
              <ul className="w-full flex flex-wrap gap-2">
                {hash_tag_list.map((tag) => (
                  <li
                    key={`hash-${tag}`}
                    className="flex shrink-0 items-center"
                  >
                    <HashTag>{tag}</HashTag>
                    {/* <Tag className="!w-fit !inline-flex !align-top !items-center">
                      <FaHashtag className="shrink-0 self-start mt-1" />
                      {tag}
                    </Tag> */}
                  </li>
                ))}
              </ul>
            </li>
          )
        },
      )}
    </ul>
  )
}

export default CoffeeChatList

CoffeeChatList.NotHasCoffeeChatList = function CoffeeChatListNotHasContent({
  type,
}: {
  type: "noPage" | "noContent"
}) {
  return (
    <div className="flex flex-1 justify-center items-center box-border p-4 h-[calc(50vh)]">
      <div className="flex flex-col justify-center items-center">
        <NoContent />
        <h3>
          {type === "noContent"
            ? "등록된 커피챗이 없습니다"
            : "페이지를 찾을 수 없습니다"}
        </h3>
      </div>
    </div>
  )
}

CoffeeChatList.Loading = function CoffeeChatListLoading() {
  return (
    <div className="fixed left-0 top-[calc(var(--height-header)+67px)] sm:top-[--height-header] w-full h-full bg-white/60 backdrop-blur-[1px] flex justify-center items-center box-border p-1">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          커피챗 리스트
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ListLoading
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "400px",
            margin: "0 auto",
            opacity: "0.5",
          }}
        />
      </div>
    </div>
  )
}

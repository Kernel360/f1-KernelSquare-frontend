"use client"

import ListLoading from "@/components/shared/animation/ListLoading"
import NoContent from "@/components/shared/animation/NoContent"
import dayjs from "dayjs"
import Link from "next/link"
import { getKorRelativeTime } from "@/util/getDate"
import Spacing from "@/components/shared/Spacing"
import HashTag from "@/components/shared/tag/HashTag"
import { useRouter } from "next/navigation"
import UserInfo, { UserProfileInfo } from "@/components/shared/user/UserInfo"
import PostTime from "@/components/shared/time/PostTime"
import type { CoffeeChatReservationListPayload } from "@/interfaces/dto/coffee-chat/get-all-coffeechat-reservation.dto"

interface CoffeeChatListProps {
  coffeeChatList: CoffeeChatReservationListPayload["list"]
}

function CoffeeChatList({ coffeeChatList }: CoffeeChatListProps) {
  const { push } = useRouter()

  const now = dayjs().format()

  const goToCoffeeChatDetail =
    (id: number) => (e: React.MouseEvent<HTMLLIElement>) => {
      push(`/chat/${id}`)
    }
  // lgDevice:grid lgDevice:grid-cols-2
  return (
    <ul className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
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
          created_date,
          modified_date,
        }) => {
          const coffeeChatAuthor: UserProfileInfo = {
            id: member_id,
            nickname: nickname,
            profileImageUrl: member_image_url,
            level,
            levelImageUrl: level_image_url,
          }

          return (
            <li
              key={article_id}
              className={`hover:shadow-md transition-shadow max-w-full box-border border border-colorsGray rounded-lg p-6 cursor-pointer`}
              onClick={goToCoffeeChatDetail(article_id)}
            >
              <div className="flex gap-2 justify-between items-center flex-shrink-0">
                <UserInfo user={coffeeChatAuthor} />
                <PostTime
                  time={getKorRelativeTime({
                    now,
                    targetDate: created_date,
                  })}
                  className="font-medium"
                />
              </div>
              <Spacing size={16} />
              <h3 className="w-fit">
                <Link
                  href={`/chat/${article_id}`}
                  className="max-w-full break-all line-clamp-2 text-ellipsis text-blue-400"
                >
                  {title}
                </Link>
              </h3>
              <Spacing size={24} />
              <ul className="w-full flex flex-wrap gap-2">
                {hash_tag_list.map((tag) => (
                  <li
                    key={`hash-${tag}`}
                    className="flex shrink-0 items-center"
                  >
                    <HashTag className="pointer-events-none">{tag}</HashTag>
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

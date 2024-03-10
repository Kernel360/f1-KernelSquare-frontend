"use client"

import dayjs from "dayjs"
import Profile from "@/components/shared/user/Profile"
import Spacing from "@/components/shared/Spacing"
import ListLoading from "@/components/shared/animation/ListLoading"
import NoContent from "@/components/shared/animation/NoContent"
import Button from "@/components/shared/button/Button"
import Pagination from "@/components/shared/pagination/Pagination"
import Tag from "@/components/shared/tag/Tag"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { GetQuestionListResponse } from "@/interfaces/dto/question/get-questionlist.dto"
import Image from "next/image"
import { useClientSession } from "@/hooks/useClientSession"
import { getKorRelativeTime } from "@/util/getDate"

interface QnAListProps {
  questions: NonNullable<GetQuestionListResponse["data"]>
}

function QnAList({ questions }: QnAListProps) {
  const { user } = useClientSession()

  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? "0"
  const size = searchParams.get("size") ?? "10"

  const { push } = useRouter()

  const now = dayjs().format()

  const goToQnaDetail =
    (id: number) => (e: React.MouseEvent<HTMLLIElement>) => {
      push(`/question/${id}`)
    }

  const goToUserProfile =
    (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      push(`/profile/${id}`)
    }

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-4">
        {questions.list.map(
          ({
            id,
            title,
            skills,
            member_id,
            nickname,
            member_image_url,
            level_image_url,
            created_date,
            level,
          }) => {
            return (
              <li
                key={id}
                className={`hover:shadow-md transition-shadow max-w-full box-border border border-colorsGray rounded-lg p-2 cursor-pointer`}
                onClick={goToQnaDetail(id)}
              >
                <h3 className="w-fit">
                  <Link
                    href={`/question/${id}`}
                    className="max-w-full line-clamp-2 text-ellipsis text-blue-400"
                  >
                    {title}
                  </Link>
                </h3>
                <ul className="flex gap-2 flex-wrap my-1">
                  {skills.map((skill, index) => {
                    return (
                      <Tag
                        key={`${id}-${index}-${skill}`}
                        className={`pointer-events-none`}
                      >
                        {skill}
                      </Tag>
                    )
                  })}
                </ul>
                <div className="flex h-full">
                  <div className="flex flex-1 justify-end self-end">
                    <time className="text-sm">
                      {getKorRelativeTime({ now, targetDate: created_date })}
                    </time>
                  </div>
                  <div
                    className={`shrink-0 flex h-max max-h-14 items-center gap-1 ml-4 rounded-lg ${
                      user
                        ? "cursor-pointer pointer-events-auto relative outline outline-[2px] outline-transparent transition-colors hover:outline hover:outline-primary outline-offset-1"
                        : "cursor-default pointer-events-none"
                    } `}
                    {...(user && {
                      onClick: goToUserProfile(member_id),
                      title: "유저 프로필로 이동",
                    })}
                  >
                    <div className="h-full box-border m-1 shrink-0 translate-x-0 translate-y-0">
                      <Profile
                        profileImage={member_image_url}
                        className="align-top m-0.5"
                      />
                    </div>
                    <div className="w-16 h-full flex flex-col justify-center items-start shrink-0">
                      <div className="text-sm">{nickname}</div>
                      <div className="flex justify-start items-center gap-1">
                        <div className="relative w-4 h-4 my-1">
                          <Image
                            src={level_image_url}
                            alt="level badge"
                            fill
                            style={{
                              objectFit: "scale-down",
                              objectPosition: "center",
                            }}
                          />
                        </div>
                        <div className="text-xs">LV.{level}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          },
        )}
      </ul>
      <Spacing size={32} />
      <Pagination
        disabledClassName="hidden"
        forcePage={Number(page)}
        pageCount={questions.pagination.total_page}
        onPageChange={({ selected }) => {
          push(`?page=${selected}`)
        }}
        onSkip={({ type, pageCount }) => {
          const searchParams = new URLSearchParams()

          const pageNumber = Number(page)

          if (type === "prevSkip") {
            if (pageCount > 10 && pageNumber - 10 >= 0) {
              searchParams.set("page", `${pageNumber - 10}`)
              searchParams.set("size", size)

              push(`/qna?${searchParams.toString()}`)

              return
            }

            return
          }

          if (type === "nextSkip") {
            if (pageCount > 10 && pageCount - 1 - pageNumber >= 10) {
              searchParams.set("page", `${pageNumber + 10}`)
              searchParams.set("size", size)

              push(`/qna?${searchParams.toString()}`)
            }

            return
          }
        }}
      />
    </div>
  )
}

QnAList.NotHasQnAContent = function QnAListNotHasContent({
  type = "noContent",
}: {
  type: "noPage" | "noContent"
}) {
  return (
    <div className="flex flex-1 justify-center items-center box-border p-4 h-[calc(100vh-var(--height-header))]">
      <div className="flex flex-col justify-center items-center">
        <NoContent />
        <h3>
          {type === "noContent"
            ? "작성된 질문이 없습니다"
            : "페이지를 찾을 수 없습니다"}
        </h3>
        <Spacing size={24} />
        <Link href={`/question`}>
          <Button buttonTheme="primary">질문 작성하기</Button>
        </Link>
      </div>
    </div>
  )
}

QnAList.Loading = function QnAListLoading() {
  return (
    <div className="fixed left-0 top-[calc(var(--height-header)+67px)] sm:top-[--height-header] w-full h-full bg-white/60 backdrop-blur-[1px] flex justify-center items-center box-border p-1">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          페이지
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

export default QnAList

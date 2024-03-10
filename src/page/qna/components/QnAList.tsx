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
import UserInfo, { UserProfileInfo } from "@/components/shared/user/UserInfo"
import PostTime from "@/components/shared/time/PostTime"

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
            const qnaAuthor: UserProfileInfo = {
              id,
              nickname,
              level,
              levelImageUrl: level_image_url,
              profileImageUrl: member_image_url,
            }

            return (
              <li
                key={id}
                className={`hover:shadow-md transition-shadow max-w-full box-border border border-colorsGray rounded-lg p-6 cursor-pointer`}
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-1 mt-6">
                  <ul className="flex-1 flex gap-2 flex-wrap my-1">
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
                  <div className="self-end sm:self-auto flex items-center gap-4 flex-wrap">
                    <UserInfo user={qnaAuthor} />
                    <PostTime
                      time={getKorRelativeTime({
                        now,
                        targetDate: created_date,
                      })}
                    />
                  </div>
                </div>
              </li>
            )
          },
        )}
      </ul>
      <div className="mt-4 sm:mt-[72px]">
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

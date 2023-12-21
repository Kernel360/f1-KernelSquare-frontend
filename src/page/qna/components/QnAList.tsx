"use client"

import dayjs from "dayjs"
import Profile from "@/components/shared/Profile"
import Spacing from "@/components/shared/Spacing"
import ListLoading from "@/components/shared/animation/ListLoading"
import NoContent from "@/components/shared/animation/NoContent"
import Button from "@/components/shared/button/Button"
import Pagination from "@/components/shared/pagination/Pagination"
import Tag from "@/components/shared/tag/Tag"
import { getQuestionList } from "@/service/question"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

function QnAList() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const page = searchParams.get("page") ?? 0

  const { data: questions, isPending } = useQuery({
    queryKey: ["question", "list", page],
    queryFn: () => getQuestionList({ page: Number(page) }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 5,
    select(payload) {
      return payload.data.data
    },
  })

  if (isPending) return <Loading />

  if (!questions?.pagination.total_page || !questions.pagination.pageable) {
    return (
      <NotHasQnAContent
        type={!questions?.pagination.total_page ? "noContent" : "noPage"}
      />
    )
  }

  return (
    <div className="relative box-border flex-1 py-4">
      <ul className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
        {questions.list.map(
          ({
            id,
            title,
            skills,
            created_by,
            image_url,
            created_date,
            level,
          }) => {
            return (
              <li
                key={title}
                className="shadow-sm hover:shadow-md transition-shadow max-w-full box-border border border-colorsGray rounded-lg p-2 my-8 first:my-0 last:my-0"
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
                    return <Tag key={`${id}-${index}-${skill}`}>{skill}</Tag>
                  })}
                </ul>
                <div className="flex">
                  <div className="flex flex-1 justify-end self-end">
                    <time className="text-sm">
                      {dayjs(created_date).format(
                        "YYYY년 MM월 DD일 hh시 mm분 ss초",
                      )}
                    </time>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Profile profileImage={image_url} />
                    <div>
                      <div className="text-sm">{created_by}</div>
                      <div className="text-xs">LV.{level}</div>
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
        previousLabel="이전"
        nextLabel="다음"
        disabledClassName="hidden"
        forcePage={Number(page)}
        pageCount={questions.pagination.total_page}
        onPageChange={({ selected }) => {
          push(`?page=${selected}`)
        }}
      />
    </div>
  )
}

function NotHasQnAContent({
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
        <Button buttonTheme="primary">질문 작성하기</Button>
      </div>
    </div>
  )
}

function Loading() {
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

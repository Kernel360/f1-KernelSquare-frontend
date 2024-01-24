"use client"

import Spacing from "@/components/shared/Spacing"
import ListLoading from "@/components/shared/animation/ListLoading"
import NoContent from "@/components/shared/animation/NoContent"
import Button from "@/components/shared/button/Button"
import Pagination from "@/components/shared/pagination/Pagination"
import { useRouter, useSearchParams } from "next/navigation"
import OneQnA from "./OneQnA"
import type { GetSearchQuestionResponse } from "@/interfaces/dto/search/search-questions.dto"

interface QnAListProps {
  questions: NonNullable<GetSearchQuestionResponse["data"]>
  keyword: string
  isSearch: boolean
}

function QnAList({ questions, keyword, isSearch }: QnAListProps) {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? 0

  const { push } = useRouter()

  console.log("qq", questions)

  return (
    <div className="py-4 w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
      <ul className="flex flex-col gap-8">
        {questions.question_list.map((question) => {
          return <OneQnA question={question} key={question.id} />
        })}
      </ul>
      <Spacing size={32} />
      <Pagination
        previousLabel="이전"
        nextLabel="다음"
        disabledClassName="hidden"
        forcePage={Number(page)}
        pageCount={questions.pagination.total_page}
        onPageChange={({ selected }) => {
          push(
            isSearch
              ? `?page=${selected}&keyword=${keyword}`
              : `?page=${selected}`,
          )
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
        <Button buttonTheme="primary">질문 작성하기</Button>
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

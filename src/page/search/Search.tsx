"use client"

import WithoutResult from "./WithoutResult"
import { useSearchParams } from "next/navigation"
import { useSearchQuestion } from "@/react-query/search"
import QnAList from "../qna/components/QnAList"
// import { CommonCheckbox } from "@/components/shared/checkbox/CommonCheckbox"

const Search = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword") ?? ""
  const page = searchParams.get("page") ?? 0

  const {
    data: searchResults,
    isPending,
    isFetching,
    error,
  } = useSearchQuestion({ keyword, page: Number(page) })

  if (isPending || isFetching) {
    return <QnAList.Loading />
  }

  if (!keyword) {
    return <WithoutResult keyword={keyword} />
  }

  if (
    !searchResults ||
    !searchResults?.pagination.total_page ||
    !searchResults.pagination.pageable
  ) {
    return <WithoutResult keyword={keyword} />
  }

  return (
    <div className="pb-6">
      <div className="w-[80%] m-auto">
        <div className="text-center text-[1.5em] my-[30px]">
          <div>
            <span className="font-bold bg-primary/60 rounded px-3">
              {keyword}
            </span>
            에 대한
          </div>
          <div>
            총{" "}
            <span className="border-b-[2px] border-b-primary font-bold">
              {searchResults.total_count.toLocaleString()}
            </span>
            개의 검색 결과가 있습니다.
          </div>
        </div>
        <QnAList
          questions={{
            pagination: searchResults.pagination,
            list: searchResults.question_list,
          }}
          isSearch
        />
      </div>
    </div>
  )
}

export default Search

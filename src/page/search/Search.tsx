"use client"

import WithoutResult from "./WithoutResult"
import { useSearchParams } from "next/navigation"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { ApiStatus } from "@/constants/response/api"
import { useSearchQuestion } from "@/react-query/search"
import QnAList from "@/components/shared/qna/QnAList"
import { CommonCheckbox } from "@/components/shared/checkbox/CommonCheckbox"

const Search = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword") ?? ""
  const page = searchParams.get("page") ?? 0

  const {
    data: searchResults,
    isPending,
    error,
  } = useSearchQuestion({ keyword, page: Number(page) })

  if (isPending) {
    return <QnAList.Loading />
  }

  if (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>
      if (
        response?.data.code ===
        ApiStatus.Search.searchQuestionList.NotFound.Code
      ) {
        return <WithoutResult />
      }
    }
  }

  if (
    !searchResults ||
    !searchResults?.pagination.total_page ||
    !searchResults.pagination.pageable
  ) {
    return <WithoutResult />
  }

  return (
    <div>
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
        <div className="flex justify-between w-[95%] m-auto">
          <div className="flex">
            <div className="pr-[15px] border-r-[1px] border-r-slate-400 cursor-pointer hover:text-primary hover:font-bold">
              최신순
            </div>
            <div className="px-[15px] border-r-[1px] border-r-slate-400 cursor-pointer hover:text-primary hover:font-bold">
              등록순
            </div>
            <div className="px-[15px] cursor-pointer hover:text-primary hover:font-bold">
              인기순
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <CommonCheckbox id="ongoing" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="ongoing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                진행 중인 QnA
              </label>
            </div>
          </div>
        </div>
        <QnAList questions={searchResults} keyword={keyword} isSearch={true} />
      </div>
    </div>
  )
}

export default Search

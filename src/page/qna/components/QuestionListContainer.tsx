"use client"

import { getQuestionList } from "@/service/question"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import QnAList from "./QnAList"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { ApiStatus } from "@/constants/response/api"
import ListLoading from "@/components/shared/animation/ListLoading"

function QuestionListContainer() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? 0

  const {
    data: questions,
    isPending,
    error,
  } = useQuery({
    queryKey: ["question", "list", page],
    queryFn: () => getQuestionList({ page: Number(page), size: 10 }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data.data
    },
  })

  if (isPending) {
    return <QnAListLoading />
  }

  if (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      if (response?.data.code === ApiStatus.QnA.getAllQuestions.NotFound.Code) {
        return <QnAList.NotHasQnAContent type={"noPage"} />
      }
    }
  }

  if (
    !questions ||
    !questions?.pagination.total_page ||
    !questions.pagination.pageable
  ) {
    return <QnAList.NotHasQnAContent type={"noContent"} />
  }

  return (
    <div className="relative box-border flex-1">
      <QnAList questions={questions} />
    </div>
  )
}

export default QuestionListContainer

function QnAListLoading() {
  return (
    <div className="relative">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          Q&A 리스트
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

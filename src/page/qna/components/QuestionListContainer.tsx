"use client"

import { getQuestionList } from "@/service/question"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import QnAList from "./QnAList"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { ApiStatus } from "@/constants/response/api"
import QnAListMenu from "./QnAListMenu"

function QuestionListContainer() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? 0

  const {
    data: questions,
    isPending,
    error,
  } = useQuery({
    queryKey: ["question", "list", page],
    queryFn: () => getQuestionList({ page: Number(page) }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data.data
    },
  })

  if (isPending) {
    return <QnAList.Loading />
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
      <div className="flex justify-end mt-8 w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
        <QnAListMenu />
      </div>
      <QnAList questions={questions} />
    </div>
  )
}

export default QuestionListContainer

"use client"

import { getQuestionList } from "@/service/question"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import QnAList from "./QnAList"
import AskQuestionButton from "./AskQuestionButton"

function QuestionListContainer() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? 0

  const { data: questions, isPending } = useQuery({
    queryKey: ["question", "list", page],
    queryFn: () => getQuestionList({ page: Number(page) }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data.data
    },
  })

  return (
    <div className="relative box-border flex-1">
      <div className="flex justify-end mt-8 w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
        <AskQuestionButton isPending={isPending} />
      </div>
      <QnAList questions={questions} isPending={isPending} />
    </div>
  )
}

export default QuestionListContainer

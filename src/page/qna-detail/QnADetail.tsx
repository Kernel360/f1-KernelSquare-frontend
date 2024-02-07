"use client"

import React from "react"
import Question from "./components/Question/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerList from "./components/Answers/AnswerList"
import { questionQueries } from "@/react-query/question"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { answerQueries } from "@/react-query/answers"
import { useClientSession } from "@/hooks/useClientSession"
import NotFound from "@/app/not-found"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isPending } = questionQueries.useQuestionData({
    id: Number(id),
  })

  const { user } = useClientSession()

  const {
    data: answers,
    isPending: isAnswerPending,
    isError,
  } = answerQueries.useGetAnswers({
    questionId: Number(id),
  })

  if (isPending || isAnswerPending) return <Loading />
  if (isError || !data) return <NotFound />

  if (data)
    return (
      <div className="relative box-border flex-1 p-10">
        <div className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          <div className="font-bold text-[36px]">Q&A</div>
          <Question id={Number(id)} />
          <MyAnswer
            questionId={Number(id)}
            list={answers.data?.answer_responses}
            nickname={data.data?.nickname}
          />
          <AnswerList
            createdby={user?.nickname!}
            questionId={Number(id)}
            isMyAnswer={data?.data?.nickname === user?.nickname}
          />
        </div>
      </div>
    )
}

export default QnADetail

function Loading() {
  return (
    <div className="h-full">
      <ContentLoading
        style={{
          width: "calc(100% - 80px)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      />
    </div>
  )
}

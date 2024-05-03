"use client"

import React from "react"
import Question from "./components/Question/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerListContainer from "./components/Answers/AnswerListContainer"
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

  return (
    <div className="relative box-border p-6 tabletDevice:p-12 pc:pl-[120px] pc:pr-[84px]">
      <div className="w-full break-all">
        <div className="font-bold text-[36px]">Q&A</div>
        <Question id={Number(id)} />
        <MyAnswer
          questionId={Number(id)}
          list={answers.data?.answer_responses}
          nickname={data.data?.nickname}
        />
        <AnswerListContainer
          createdby={user?.nickname!}
          questionId={Number(id)}
          isQuestionAuthor={
            user ? user.nickname === data.data?.nickname : false
          }
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

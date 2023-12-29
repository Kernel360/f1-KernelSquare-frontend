"use client"

import React from "react"
import Question from "./components/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerList from "./components/Answers/AnswerList"
import { questionQueries } from "@/react-query/question"
import ContentLoading from "@/components/shared/animation/ContentLoading"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isPending } = questionQueries.useQuestionData({
    id: Number(id),
  })

  if (isPending) return <Loading />

  if (data)
    return (
      <div className="relative box-border flex-1 p-10">
        <div className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          <div className="font-bold text-[36px]">Q&A</div>
          <Question id={Number(id)} />
          <Title title="My Answer" />
          <MyAnswer id={Number(id)} />
          <Title title="Answers" />
          <AnswerList list={data?.data?.list} />
        </div>
      </div>
    )
}

export default QnADetail

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <div className="font-bold text-[24px]">{title}</div>
}

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

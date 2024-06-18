"use client"

import React from "react"
import Question from "./components/Question/Question"
import CreateAnswer from "./components/Answers/CreateAnswer"
import AnswerListContainer from "./components/Answers/AnswerListContainer"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import { useClientSession } from "@/hooks/useClientSession"
import NotFound from "@/app/not-found"
import Spacing from "@/components/shared/Spacing"
import LinkToListPage from "@/components/LinkToListPage"
import { useQuestionDetail } from "./hooks/question/useQuestionDetail"
import { useGetAnswers } from "./hooks/answer/useGetAnswers"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isPending } = useQuestionDetail({
    id: Number(id),
  })

  const { user } = useClientSession()

  const {
    data: answers,
    isPending: isAnswerPending,
    isError,
  } = useGetAnswers({
    questionId: Number(id),
  })

  const isQuestionAuthor = user
    ? user.member_id === data?.data?.member_id
    : false

  if (isPending || isAnswerPending) return <Loading />
  if (isError || !data?.data) return <NotFound />

  return (
    <div className="relative box-border px-6 pb-6 pt-6 tabletDevice:px-12 tabletDevice:pb-12 pc:pt-[72px] pc:pl-[120px] pc:pr-[84px]">
      <div className="w-full break-all">
        <div className="hidden pc:block">
          <LinkToListPage to="qna" />
          <Spacing size={24} />
        </div>
        <Question question={data.data} />
        <Spacing size={48} />
        <CreateAnswer
          question={data.data}
          list={answers.data?.answer_responses}
          isQuestionAuthor={isQuestionAuthor}
        />
        <AnswerListContainer
          questionId={Number(id)}
          isQuestionAuthor={isQuestionAuthor}
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

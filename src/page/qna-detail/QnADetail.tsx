"use client"

import React, { useEffect, useState } from "react"
import Question from "./components/Question"
import MyAnswer from "./components/MyAnswer"
import AnswerList from "./components/Answers/AnswerList"
import { questionQueries } from "@/react-query/question"
import ContentLoading from "@/components/shared/animation/ContentLoading"
import type { Answer } from "@/interfaces/answer"
import { answerQueries } from "@/react-query/answers"
import { useClientSession } from "@/hooks/useClientSession"

const QnADetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isPending } = questionQueries.useQuestionData({
    id: Number(id),
  })

  const { user } = useClientSession()

  const { data: answers, isPending: isAnswerPending } =
    answerQueries.useGetAnswers({
      questionId: Number(id),
    })

  const [isAnswerMode, setIsAnswerMode] = useState(false)

  const handleCheckMyAnswer = (list: Answer[], nickname?: string) =>
    list?.some((answer) => answer.created_by === nickname)

  useEffect(() => {
    const fetchData = async () => {
      if (
        answers?.data &&
        user?.nickname &&
        !handleCheckMyAnswer(answers.data, user.nickname)
      ) {
        setIsAnswerMode(true)
      }
    }

    fetchData()
  }, [answers, user?.nickname])

  if (isPending || isAnswerPending || !data) return <Loading />

  if (data)
    return (
      <div className="relative box-border flex-1 p-10">
        <div className="w-[calc(100%-12px)] sm:w-[calc(100%-22px)] lg:w-[calc(100%-42px)] mx-auto">
          <div className="font-bold text-[36px]">Q&A</div>
          <Question id={Number(id)} />
          <MyAnswer
            id={Number(id)}
            isAnswerMode={isAnswerMode}
            setIsAnswerMode={setIsAnswerMode}
          />
          <Title title="Answers" />
          <AnswerList user={user?.nickname} id={Number(id)} />
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
